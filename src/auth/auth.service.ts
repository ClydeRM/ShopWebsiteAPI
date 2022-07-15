import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { HashService } from './hash.service';

import { SecurityConfig } from 'src/common/configs/config.interface';
import { SigninDto, SignupDto } from './dto';
import { Tokens } from './types';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async localSignup(signupDto: SignupDto): Promise<Tokens> {
    // Hash User Password
    const hashedPassword = await this.hashService.hashData(signupDto.password);

    try {
      // Create User
      const newUser = await this.prisma.user.create({
        data: {
          email: signupDto.email,
          hash: hashedPassword,
          firstname: signupDto.firstName,
          lastname: signupDto.lastName,
          role: 'USER',
        },
      });
      // Generate Tokens
      const tokens = await this.generateTokens({
        userId: newUser.id,
        email: newUser.email,
      });

      // Update HashedRT
      await this.updateHashedRt(newUser.id, tokens.refresh_token);

      //  Return Tokens
      return tokens;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        // Credential already used
        throw new ForbiddenException('Credentials taken.');
      } else {
        throw new Error(error);
      }
    }
  }
  async localSignin(signinDto: SigninDto): Promise<Tokens> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: signinDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate password
    const passwordValide = await this.hashService.validateData(
      signinDto.password,
      user.hash,
    );

    if (!passwordValide) {
      throw new BadRequestException('Invalid credential.');
    }

    // Return token
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
    });

    // Update HashedRT
    await this.updateHashedRt(user.id, tokens.refresh_token);

    return tokens;
  }
  async logout(userId: string) {
    // If hashedRT field is null, represent User already logout
    // Get user by id, and only if hashedRt field is not NULL
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRT: {
          not: null,
        },
      },
      data: {
        hashedRT: null,
      },
    });
  }
  async refreshToken(userId: string, rt: string): Promise<Tokens> {
    // Find user by id
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied.');
    }

    // validate refresh_token
    const rtMatch = this.hashService.validateData(rt, user.hashedRT);

    if (!rtMatch) {
      throw new ForbiddenException('Access Denied.');
    }

    // Generate Tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
    });
    await this.updateHashedRt(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateHashedRt(userId: string, rt: string): Promise<void> {
    // Save refresh_token
    const hashedRefreshToken = await this.hashService.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRT: hashedRefreshToken,
      },
    });
  }

  validateUser(userId: string): Promise<User> {
    // Compare Jwt payload data with DB data
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  private async generateAccessToken(payload: {
    userId: string;
    email: string;
  }): Promise<string> {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const accessToken = this.jwtService.signAsync(payload, {
      expiresIn: securityConfig.expiresIn,
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    return accessToken;
  }

  private async generateRefreshToken(payload: {
    userId: string;
    email: string;
  }): Promise<string> {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshToken = this.jwtService.signAsync(payload, {
      expiresIn: securityConfig.refreshIn,
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    return refreshToken;
  }

  async generateTokens(payload: {
    userId: string;
    email: string;
  }): Promise<Tokens> {
    return {
      access_token: await this.generateAccessToken(payload),
      refresh_token: await this.generateRefreshToken(payload),
    };
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  localSignup(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.localSignup(signupDto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  localSignin(@Body() signinDto: SigninDto): Promise<Tokens> {
    return this.authService.localSignin(signinDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refresh_token: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken(userId, refresh_token);
  }
}

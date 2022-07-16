import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { JwtPayload, JwtPayloadWithRT } from 'src/auth/types/';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true, // From req, Keep the token and pass to the callback
    });
  }

  async validate(
    request: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRT> {
    const refreshToken = request
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token malformed');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}

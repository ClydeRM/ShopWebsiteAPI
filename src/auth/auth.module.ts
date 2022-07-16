import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      // Usually config secret expires time here
      // Cause refresh_token, implement config in service
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HashService, AtStrategy, RtStrategy],
})
export class AuthModule {}

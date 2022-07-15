import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { SecurityConfig } from 'src/common/configs/config.interface';

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRound = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRound))
      ? Number(saltOrRound)
      : saltOrRound;
  }

  constructor(private configService: ConfigService) {}

  validatePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  hashData(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }
}

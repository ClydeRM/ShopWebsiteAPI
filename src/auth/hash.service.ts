import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { SecurityConfig } from 'src/common/configs/config.interface';

@Injectable()
export class HashService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRound = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRound))
      ? Number(saltOrRound)
      : saltOrRound;
  }

  constructor(private configService: ConfigService) {}

  validateData(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }

  hashData(data: string): Promise<string> {
    return hash(data, this.bcryptSaltRounds);
  }
}

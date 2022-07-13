export interface Config {
  nest: NestConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

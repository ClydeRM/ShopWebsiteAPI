import { JwtPayload } from '.';

export interface JwtPayloadWithRT extends JwtPayload {
  refreshToken: string;
}

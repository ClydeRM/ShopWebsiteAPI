import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRT } from 'src/auth/types';

export const GetCurrentUser = createParamDecorator(
  (metadata: keyof JwtPayloadWithRT | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!metadata) return req.user;
    return req.user[metadata];
  },
);

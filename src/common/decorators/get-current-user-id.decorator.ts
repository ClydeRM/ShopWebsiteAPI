import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as JwtPayload;
    return user.userId;
  },
);

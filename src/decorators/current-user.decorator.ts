import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/auth/AuthRequest';

import { UserModel } from 'src/user/user.model';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserModel => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);

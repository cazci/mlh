import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_AUTH_ROUTE } from 'src/auth/decorators/auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAuthRoute = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_ROUTE,
      [context.getHandler(), context.getClass()],
    );

    if (isAuthRoute) {
      return true;
    }

    return super.canActivate(context);
  }
}

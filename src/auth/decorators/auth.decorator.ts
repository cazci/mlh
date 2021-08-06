import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_ROUTE = 'isAuthRoute';
export const AuthRoute = () => SetMetadata(IS_AUTH_ROUTE, true);

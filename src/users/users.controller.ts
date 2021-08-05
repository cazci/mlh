import { Controller, Get, Request } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('me')
  async getMe(@Request() req) {
    return req.user;
  }
}

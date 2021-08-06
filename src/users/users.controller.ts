import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  @ApiOperation({
    description: 'Get current user info',
  })
  @Get('me')
  async getMe(@Request() req) {
    return req.user;
  }
}

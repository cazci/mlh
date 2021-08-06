import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthRoute } from 'src/decorators/auth.decorator';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AuthRoute()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @AuthRoute()
  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }
}

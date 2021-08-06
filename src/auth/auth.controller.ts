import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRoute } from 'src/auth/decorators/auth.decorator';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Login with valid username and password',
  })
  @AuthRoute()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    description: 'Register as a new user',
  })
  @AuthRoute()
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return this.authService.register(registerUser);
  }
}

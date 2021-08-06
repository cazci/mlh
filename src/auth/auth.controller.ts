import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRoute } from 'src/auth/decorators/auth.decorator';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * @param username Valid username
   * @param password Valid password
   * @returns {AuthResponse}
   */
  @ApiOperation({
    description: 'Login with valid username and password',
  })
  @AuthRoute()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req): Promise<AuthResponse> {
    return this.authService.login(req.user);
  }

  /**
   * @param registerUser New user to register
   * @returns {AuthResponse}
   */
  @ApiOperation({
    description: 'Register as a new user',
  })
  @AuthRoute()
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<AuthResponse> {
    return this.authService.register(registerUser);
  }
}

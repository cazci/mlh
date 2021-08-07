import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { AuthResponse } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser = async (
    username: string,
    password: string,
  ): Promise<Partial<User> | null> => {
    const user = await this.usersService.findByUsername(username);

    if (user && (await compare(password, user.password))) {
      delete user.password;
      return user;
    }

    return null;
  };

  login = (user: Partial<User>): AuthResponse => {
    const payload = { username: user.username, sub: user.userId };
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      accessToken: this.jwtService.sign(payload),
    };
  };

  register = async (registerUser: RegisterUserDto): Promise<AuthResponse> => {
    const currentUserRecord = await this.usersService.findByUsername(
      registerUser.username,
    );

    if (currentUserRecord) {
      throw new ConflictException('User already exists');
    }

    const userWithHashedPassword: RegisterUserDto = {
      username: registerUser.username,
      password: await hash(registerUser.password, 10),
    };

    const result = await this.usersService.createUser(
      userWithHashedPassword as User,
    );

    if (!result.identifiers) {
      throw new HttpException(
        'Failed to register the user',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const payload = {
      username: registerUser.username,
      sub: result.identifiers[0].userId,
    };

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User successfully registered',
      accessToken: this.jwtService.sign(payload),
    };
  };
}

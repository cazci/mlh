import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser = async (username: string, pass: string): Promise<any> => {
    const user = await this.usersService.findByUsername(username);
    const isMatch = await compare(pass, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  };

  login = (user: any) => {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  };

  register = async (registerUser: RegisterUserDto) => {
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

    const result = await this.usersService.registerUser(
      userWithHashedPassword as User,
    );

    if (!result.identifiers) {
      return 'failed';
    }

    return 'success';
  };
}

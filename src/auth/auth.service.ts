import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser = async (username: string, pass: string): Promise<any> => {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === pass) {
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

  // TODO: Use bcrypt and hash the password when storing
  register = async (user: UserDto) => {
    const currentUserRecord = await this.usersService.findByUsername(
      user.username,
    );

    if (currentUserRecord) {
      throw new ConflictException('User already exists');
    }

    const result = await this.usersService.registerUser(user as User);

    if (!result.identifiers) {
      return 'failed';
    }

    return 'success';
  };
}

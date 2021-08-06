import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findByUsername = (username: string): Promise<User> => {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  };

  registerUser = (user: User): Promise<InsertResult> => {
    return this.userRepository.insert(user);
  };
}

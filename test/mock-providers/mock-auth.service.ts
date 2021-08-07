import { Injectable } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { User } from '../../src/users/entities/user.entity';

@Injectable()
export class MockAuthService extends AuthService {
  validateUser = async (): Promise<Partial<User>> => ({
    userId: 1,
    username: 'test user',
  });
}

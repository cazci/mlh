import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { config } from '../config/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;

  const actionMock = jest.fn((dto: any) => {
    return dto;
  });

  const MockRepository = jest.fn().mockImplementation(() => {
    return {
      findOne: actionMock,
      insert: actionMock,
    };
  });

  const mockRepository = new MockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.jwt.secret,
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

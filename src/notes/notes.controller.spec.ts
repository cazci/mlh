import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  let controller: NotesController;

  const actionMock = jest.fn((dto: any) => {
    return dto;
  });

  const MockRepository = jest.fn().mockImplementation(() => {
    return {
      findOne: actionMock,
      find: actionMock,
      insert: actionMock,
      update: actionMock,
      delete: actionMock,
    };
  });

  const mockRepository = new MockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

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
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

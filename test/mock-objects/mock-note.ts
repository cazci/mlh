import { Note } from '../../src/notes/entities/note.entity';
import { mockUser } from './mock-user';

export const mockNote: Note = {
  noteId: 1,
  title: 'test note title',
  body: 'test note body',
  status: 1,
  user: mockUser,
};

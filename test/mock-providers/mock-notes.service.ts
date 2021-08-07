import { Injectable } from '@nestjs/common';
import { Note } from '../../src/notes/entities/note.entity';
import { mockNote } from '../mock-objects/mock-note';
import { NotesService } from '../../src/notes/notes.service';

@Injectable()
export class MockNotesService extends NotesService {
  getNotesByStatus = (): Promise<Note[]> => {
    return Promise.resolve([mockNote]);
  };
}

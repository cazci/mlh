import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/notes/note.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}
  getNoteById = (noteId: string): Promise<Note> => {
    return this.noteRepository.findOne({
      where: {
        noteId,
      },
    });
  };

  createNote = (note: Note): Promise<InsertResult> => {
    return this.noteRepository.insert(note);
  };

  updateNote = (noteId: number, note: Note): Promise<UpdateResult> => {
    return this.noteRepository.update(noteId, note);
  };

  deleteNote = (noteId: number): Promise<DeleteResult> => {
    return this.noteRepository.delete(noteId);
  };

  getActiveNotes = (userId: number): Promise<Note[]> => {
    return this.noteRepository.find({
      where: {
        user: userId,
        status: true,
      },
    });
  };

  getArchivedNotes = (userId: number): Promise<Note[]> => {
    return this.noteRepository.find({
      where: {
        user: userId,
        status: false,
      },
    });
  };
}

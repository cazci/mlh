import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  getNoteById = (userId: number, noteId: number): Promise<Note> => {
    return this.noteRepository.findOne({
      where: {
        noteId,
        user: userId,
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

  getNotesByStatus = (userId: number, status: number): Promise<Note[]> => {
    return this.noteRepository.find({
      where: {
        status,
        user: userId,
      },
    });
  };
}

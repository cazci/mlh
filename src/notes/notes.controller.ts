import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { NoteDto } from 'src/notes/dto/note.dto';
import { Note } from 'src/notes/entity/note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  // Save a new note
  @Post()
  async create(@Request() req, @Body() noteDto: NoteDto) {
    const note: any = {
      title: noteDto.title,
      body: noteDto.body,
      status: true,
      user: req.user,
    };

    return this.notesService.createNote(note as Note);
  }

  // Update a previously saved note
  @Patch(':noteId')
  async update(@Request() req, @Param() params, @Body() noteDto: NoteDto) {
    return this.notesService.updateNote(params.noteId, noteDto as Note);
  }

  // Delete a saved note
  @Delete(':noteId')
  async delete(@Request() req, @Param() params) {
    return this.notesService.deleteNote(params.noteId);
  }

  // Archive a note
  @Patch(':noteId/archive')
  async archive(@Request() req, @Param() params) {
    return this.notesService.updateNote(params.noteId, {
      status: false,
    } as Note);
  }

  // Unarchive a previously archived note
  @Patch(':noteId/unarchive')
  async unarchive(@Request() req, @Param() params) {
    return this.notesService.updateNote(params.noteId, {
      status: true,
    } as Note);
  }

  // List saved notes that aren't archived
  @Get()
  async getActiveNotes(@Request() req) {
    return this.notesService.getActiveNotes(req.user.userId);
  }

  // List notes that are archived
  @Get('archived')
  async getArchivedNotes(@Request() req) {
    return this.notesService.getArchivedNotes(req.user.userId);
  }
}

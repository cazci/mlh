import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto, UpdateNoteDto } from 'src/notes/dto/note.dto';
import { Note } from 'src/notes/entity/note.entity';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({
    description: 'Save a new note',
  })
  @Post()
  async create(@Request() req, @Body() createNote: CreateNoteDto) {
    const note: any = {
      title: createNote.title,
      body: createNote.body,
      status: true,
      user: req.user,
    };

    return this.notesService.createNote(note as Note);
  }

  @ApiOperation({
    description: 'Update a previously saved note',
  })
  @Patch(':noteId')
  async update(
    @Request() req,
    @Param('noteId', ParseIntPipe) noteId: number,
    @Body() updateNote: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(noteId, updateNote as Note);
  }

  @ApiOperation({
    description: 'Delete a saved note',
  })
  @Delete(':noteId')
  async delete(@Request() req, @Param('noteId', ParseIntPipe) noteId: number) {
    return this.notesService.deleteNote(noteId);
  }

  @ApiOperation({
    description: 'Archive a note',
  })
  @Patch(':noteId/archive')
  async archive(@Request() req, @Param('noteId', ParseIntPipe) noteId: number) {
    return this.notesService.updateNote(noteId, {
      status: false,
    } as Note);
  }

  @ApiOperation({
    description: 'Unarchive a previously archived note',
  })
  @Patch(':noteId/unarchive')
  async unarchive(
    @Request() req,
    @Param('noteId', ParseIntPipe) noteId: number,
  ) {
    return this.notesService.updateNote(noteId, {
      status: true,
    } as Note);
  }

  @ApiOperation({
    description: "List saved notes that aren't archived",
  })
  @Get()
  async getActiveNotes(@Request() req) {
    return this.notesService.getActiveNotes(req.user.userId);
  }

  @ApiOperation({
    description: 'List notes that are archived',
  })
  @Get('archived')
  async getArchivedNotes(@Request() req) {
    return this.notesService.getArchivedNotes(req.user.userId);
  }
}

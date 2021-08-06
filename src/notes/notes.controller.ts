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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from 'src/notes/entities/note.entity';
import { NotesService } from './notes.service';
import { ApiResponse } from 'src/dto/api-response.dto';
import { NoteStatus } from './models/note-status';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  /**
   * @param createNote New note to create
   * @returns {ApiResponse}
   */
  @ApiOperation({
    description: 'Save a new note',
  })
  @Post()
  async create(
    @Request() req,
    @Body() createNote: CreateNoteDto,
  ): Promise<ApiResponse> {
    const note: Partial<Note> = {
      title: createNote.title,
      body: createNote.body,
      status: NoteStatus.ACTIVE,
      user: req.user,
    };

    const result = await this.notesService.createNote(note as Note);

    if (!result.identifiers) {
      throw new HttpException(
        'Failed to register the user',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully created a note',
    };
  }

  /**
   * @param noteId Note id to update
   * @param updateNote Partial note to update
   * @returns {ApiResponse}
   */
  @ApiOperation({
    description: 'Update a previously saved note',
  })
  @Patch(':noteId')
  async update(
    @Request() req,
    @Param('noteId', ParseIntPipe) noteId: number,
    @Body() updateNote: UpdateNoteDto,
  ): Promise<ApiResponse> {
    const note = await this.notesService.getNoteById(noteId);

    if (req.user.userId !== note.user.userId) {
      throw new HttpException(
        "User doesn't have permission to edit this note",
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.notesService.updateNote(
      noteId,
      updateNote as Note,
    );

    if (!result.affected) {
      throw new HttpException(
        'Failed to update the note',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully updated the note',
    };
  }

  /**
   * @param noteId Note id to delete
   * @returns {ApiResponse}
   */
  @ApiOperation({
    description: 'Delete a saved note',
  })
  @Delete(':noteId')
  async delete(
    @Request() req,
    @Param('noteId', ParseIntPipe) noteId: number,
  ): Promise<ApiResponse> {
    const note = await this.notesService.getNoteById(noteId);

    if (req.user.userId !== note.user.userId) {
      throw new HttpException(
        "User doesn't have permission to edit this note",
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.notesService.deleteNote(noteId);

    if (!result.affected) {
      throw new HttpException(
        'Failed to delete the note',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully deleted the note',
    };
  }

  /**
   * @param noteId Note id to archive
   * @returns {ApiResponse}
   */
  @ApiOperation({
    description: 'Archive a note',
  })
  @Patch(':noteId/archive')
  async archive(
    @Request() req,
    @Param('noteId', ParseIntPipe) noteId: number,
  ): Promise<ApiResponse> {
    const note = await this.notesService.getNoteById(noteId);

    if (req.user.userId !== note.user.userId) {
      throw new HttpException(
        "User doesn't have permission to archive this note",
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.notesService.updateNote(noteId, {
      status: NoteStatus.ARCHIVED,
    } as Note);

    if (!result.affected) {
      throw new HttpException(
        'Failed to archive the note',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully archived the note',
    };
  }

  /**
   * @param noteId Note id to unarchive
   * @returns {ApiResponse}
   */
  @ApiOperation({
    description: 'Unarchive a previously archived note',
  })
  @Patch(':noteId/unarchive')
  async unarchive(
    @Request() req,
    @Param('noteId', ParseIntPipe) noteId: number,
  ): Promise<ApiResponse> {
    const note = await this.notesService.getNoteById(noteId);

    if (req.user.userId !== note.user.userId) {
      throw new HttpException(
        "User doesn't have permission to unarchive this note",
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.notesService.updateNote(noteId, {
      status: NoteStatus.ACTIVE,
    } as Note);

    if (!result.affected) {
      throw new HttpException(
        'Failed to unarchive the note',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully unarchived the note',
    };
  }

  /**
   * @returns {ApiResponse<Note[]>}
   */
  @ApiOperation({
    description: "List saved notes that aren't archived",
  })
  @Get()
  async getActiveNotes(@Request() req): Promise<ApiResponse<Note[]>> {
    const result = await this.notesService.getNotesByStatus(
      req.user.userId,
      NoteStatus.ACTIVE,
    );

    if (!result) {
      throw new HttpException(
        'Failed to get the active notes',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      payload: result,
    };
  }

  /**
   * @returns {ApiResponse<Note[]>}
   */
  @ApiOperation({
    description: 'List notes that are archived',
  })
  @Get('archived')
  async getArchivedNotes(@Request() req): Promise<ApiResponse<Note[]>> {
    const result = await this.notesService.getNotesByStatus(
      req.user.userId,
      NoteStatus.ARCHIVED,
    );

    if (!result) {
      throw new HttpException(
        'Failed to get the archived notes',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      payload: result,
    };
  }
}

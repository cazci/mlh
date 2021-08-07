import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NotesService } from '../src/notes/notes.service';
import { AuthService } from '../src/auth/auth.service';
import { MockAuthService } from './mock-providers/mock-auth.service';
import { MockNotesService } from './mock-providers/mock-notes.service';
import { mockNote } from './mock-objects/mock-note';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useClass(MockAuthService)
      .overrideProvider(NotesService)
      .useClass(MockNotesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const session = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user 1', password: '123' })
      .expect(200);

    accessToken = session.body.accessToken;
  });

  it('/ (GET) return a list of active notes', async () => {
    return request(app.getHttpServer())
      .get('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'Success',
        payload: [mockNote],
      });
  });
});

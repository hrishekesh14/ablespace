import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { TasksService } from '../src/tasks/tasks.service';
import { ProjectsService } from '../src/projects/projects.service';

describe('AbleSpace API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.DATABASE_PATH = ':memory:';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    await app.get(UsersService).seedIfEmpty();
    await app.get(TasksService).seedIfEmpty();
    await app.get(ProjectsService).seedIfEmpty();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET) reports ok', async () => {
    const res = await request(app.getHttpServer()).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('/api/tasks (GET) returns seeded tasks', async () => {
    const res = await request(app.getHttpServer()).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.some((t: { title: string }) => t.title === 'Write API Documentation')).toBe(
      true,
    );
  });

  it('/api/tasks (POST) rejects an invalid status', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'New task', status: 'not-a-status' });
    expect(res.status).toBe(400);
  });

  it('/api/tasks (POST) creates a task, then PATCH updates it', async () => {
    const created = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Write e2e tests', status: 'todo' });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe('Write e2e tests');

    const updated = await request(app.getHttpServer())
      .patch(`/api/tasks/${created.body.id}`)
      .send({ priority: 'high' });
    expect(updated.status).toBe(200);
    expect(updated.body.priority).toBe('high');
  });

  it('/api/projects (GET) returns seeded projects', async () => {
    const res = await request(app.getHttpServer()).get('/api/projects');
    expect(res.status).toBe(200);
    expect(res.body.some((p: { name: string }) => p.name === 'Design Homepage')).toBe(true);
  });

  it('/api/auth/guest (POST) issues a guest session', async () => {
    const res = await request(app.getHttpServer()).post('/api/auth/guest');
    expect(res.status).toBe(201);
    expect(res.body.user.name).toBe('Guest');
    expect(typeof res.body.accessToken).toBe('string');
  });

  it('/api/auth/profile (PATCH) requires a bearer token', async () => {
    const res = await request(app.getHttpServer())
      .patch('/api/auth/profile')
      .send({ name: 'New Name' });
    expect(res.status).toBe(401);
  });
});

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UsersService } from './users/users.service';
import { TasksService } from './tasks/tasks.service';
import { ProjectsService } from './projects/projects.service';
import type { AppConfig } from './config/configuration';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  app.enableCors({ origin: appConfig?.corsOrigin, credentials: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Seed demo data on first boot so the API is immediately usable against
  // the frontend without a separate migration/seed step.
  await app.get(UsersService).seedIfEmpty();
  await app.get(TasksService).seedIfEmpty();
  await app.get(ProjectsService).seedIfEmpty();

  const port = appConfig?.port ?? 3001;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`AbleSpace API listening on http://localhost:${port}/api`);
}

bootstrap();

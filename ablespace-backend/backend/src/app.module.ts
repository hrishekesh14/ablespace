import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { AppConfig } from './config/configuration';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { TaskEntity } from './tasks/task.entity';
import { ProjectEntity } from './projects/project.entity';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databasePath = configService.get<AppConfig>('app')?.databasePath;
        const isInMemory = !databasePath || databasePath === ':memory:';
        return {
          type: 'sqljs',
          location: isInMemory ? undefined : databasePath,
          autoSave: !isInMemory,
          entities: [UserEntity, TaskEntity, ProjectEntity],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

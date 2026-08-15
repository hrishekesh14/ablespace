import { IsArray, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import type { Comment, Priority, Subtask, TaskStatus, UpdateLogEntry } from '../task.entity';

const STATUS_VALUES: TaskStatus[] = ['todo', 'doing', 'completed', 'on-hold'];
const PRIORITY_VALUES: Priority[] = ['no-priority', 'urgent', 'high', 'medium', 'low'];

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsIn(STATUS_VALUES)
  status?: TaskStatus;

  @IsOptional()
  @IsIn(PRIORITY_VALUES)
  priority?: Priority;

  @IsOptional()
  @IsArray()
  memberIds?: string[];

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsArray()
  labels?: string[];

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsArray()
  teams?: string[];

  @IsOptional()
  @IsString()
  reporterId?: string;

  @IsOptional()
  @IsArray()
  subtasks?: Subtask[];

  @IsOptional()
  @IsArray()
  comments?: Comment[];

  @IsOptional()
  @IsArray()
  updates?: UpdateLogEntry[];
}

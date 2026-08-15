import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import type { TaskStatus } from '../task.entity';

const STATUS_VALUES: TaskStatus[] = ['todo', 'doing', 'completed', 'on-hold'];

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsIn(STATUS_VALUES)
  status!: TaskStatus;
}

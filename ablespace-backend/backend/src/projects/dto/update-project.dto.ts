import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import type { Priority } from '../../tasks/task.entity';

const PRIORITY_VALUES: Priority[] = ['no-priority', 'urgent', 'high', 'medium', 'low'];

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsIn(PRIORITY_VALUES)
  priority?: Priority;

  @IsOptional()
  @IsString()
  leadId?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}

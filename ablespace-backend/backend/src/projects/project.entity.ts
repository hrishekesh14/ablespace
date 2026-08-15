import { Column, Entity, PrimaryColumn } from 'typeorm';
import type { Priority } from '../tasks/task.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text', { default: 'no-priority' })
  priority!: Priority;

  @Column('text', { nullable: true })
  leadId?: string;

  @Column('text', { nullable: true })
  dueDate?: string;
}

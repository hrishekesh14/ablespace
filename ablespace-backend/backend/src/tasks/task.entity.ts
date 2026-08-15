import { Column, Entity, PrimaryColumn } from 'typeorm';

export type TaskStatus = 'todo' | 'doing' | 'completed' | 'on-hold';
export type Priority = 'no-priority' | 'urgent' | 'high' | 'medium' | 'low';

export interface Subtask {
  id: string;
  title: string;
  priority: Priority;
  memberId?: string;
  dueDate?: string;
}

export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface UpdateLogEntry {
  id: string;
  authorId: string;
  message: string;
  createdAt: string;
}

/**
 * Subtasks, comments, and updates are stored as JSON columns rather than
 * separate related tables. For this assessment's scope (a single-user
 * workspace, no cross-task querying of subtask/comment data) that keeps
 * the schema simple while still round-tripping the exact shape the
 * frontend's Task type expects. A production system with multi-user
 * comment moderation or subtask reporting would promote these to their
 * own tables with foreign keys.
 */
@Entity('tasks')
export class TaskEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  title!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text')
  status!: TaskStatus;

  @Column('text', { default: 'no-priority' })
  priority!: Priority;

  @Column('simple-json', { default: '[]' })
  memberIds!: string[];

  @Column('text', { nullable: true })
  dueDate?: string;

  @Column('text', { nullable: true })
  endDate?: string;

  @Column('simple-json', { default: '[]' })
  labels!: string[];

  @Column('text', { nullable: true })
  role?: string;

  @Column('simple-json', { nullable: true })
  teams?: string[];

  @Column('text', { nullable: true })
  reporterId?: string;

  @Column('simple-json', { default: '[]' })
  subtasks!: Subtask[];

  @Column('simple-json', { default: '[]' })
  comments!: Comment[];

  @Column('simple-json', { default: '[]' })
  updates!: UpdateLogEntry[];
}

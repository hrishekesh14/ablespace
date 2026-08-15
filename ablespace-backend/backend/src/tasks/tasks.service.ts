import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const SEED_TASKS: Partial<TaskEntity>[] = [
  {
    id: 'task-1',
    title: 'Write API Documentation',
    description:
      'Create clear and detailed API documentation to guide developers using the inventory and sales metrics features effectively.',
    status: 'todo',
    priority: 'high',
    memberIds: ['admin'],
    dueDate: '2026-07-31',
    endDate: '2026-08-05',
    labels: ['Research', 'Design', 'Development', 'Testing', 'Deployment'],
    role: 'Designer',
    teams: ['Engineering'],
    reporterId: 'dexter',
    subtasks: [
      {
        id: 'sub-1',
        title: 'Subtask 1',
        priority: 'high',
        memberId: 'admin',
        dueDate: '2026-09-12',
      },
      { id: 'sub-2', title: 'Subtask 2', priority: 'low', memberId: 'cn', dueDate: '2026-09-15' },
      { id: 'sub-3', title: 'Subtask 3', priority: 'medium', dueDate: '2026-09-18' },
    ],
    comments: [{ id: 'c-1', authorId: 'ankit', body: 'dsds', createdAt: '2026-08-01T12:00:00Z' }],
    updates: [
      {
        id: 'u-1',
        authorId: 'dexter',
        message: 'changed priority from No priority to Urgent',
        createdAt: '2026-08-01T10:00:00Z',
      },
      {
        id: 'u-2',
        authorId: 'dexter',
        message: 'posted an update',
        createdAt: '2026-08-01T09:00:00Z',
      },
    ],
  },
  {
    id: 'task-2',
    title: 'Implement Search Function',
    status: 'todo',
    priority: 'medium',
    memberIds: ['admin'],
    dueDate: '2026-07-29',
    labels: ['Development', 'Deployment'],
  },
  {
    id: 'task-3',
    title: 'Deploy to Production',
    status: 'todo',
    priority: 'high',
    memberIds: ['admin'],
    dueDate: '2026-07-29',
    labels: ['Deployment'],
  },
  {
    id: 'task-4',
    title: 'Code Review Completed',
    status: 'doing',
    priority: 'medium',
    memberIds: ['admin', 'cn'],
    dueDate: '2026-07-29',
    labels: ['Deployment'],
  },
  {
    id: 'task-5',
    title: 'Design Mockups Finalized',
    status: 'doing',
    priority: 'high',
    memberIds: ['admin'],
    dueDate: '2026-07-29',
    labels: ['Deployment'],
  },
  {
    id: 'task-6',
    title: 'Feature Testing Passed',
    status: 'completed',
    priority: 'medium',
    memberIds: ['cn'],
    dueDate: '2026-07-30',
    labels: ['Testing', 'Passed'],
  },
  {
    id: 'task-7',
    title: 'UI Design Updated',
    status: 'completed',
    priority: 'low',
    memberIds: ['dexter'],
    dueDate: '2026-07-31',
    labels: ['Design', 'Updated'],
  },
  {
    id: 'task-8',
    title: 'Security Audit Scheduled',
    status: 'completed',
    priority: 'high',
    memberIds: ['admin'],
    dueDate: '2026-08-01',
    labels: ['Audit', 'Scheduled'],
  },
  {
    id: 'task-9',
    title: 'UI Review',
    status: 'on-hold',
    priority: 'medium',
    memberIds: ['dexter'],
    labels: [],
  },
  {
    id: 'task-10',
    title: 'Backend Refactor',
    status: 'on-hold',
    priority: 'low',
    memberIds: ['admin'],
    labels: [],
  },
  {
    id: 'task-11',
    title: 'User Feedback Review',
    status: 'on-hold',
    priority: 'medium',
    memberIds: ['cn'],
    labels: [],
  },
  {
    id: 'task-12',
    title: 'Performance Optimization',
    status: 'on-hold',
    priority: 'high',
    memberIds: ['admin'],
    labels: [],
  },
];

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  async seedIfEmpty(): Promise<void> {
    const count = await this.tasksRepository.count();
    if (count > 0) return;
    const entities = SEED_TASKS.map((task) =>
      this.tasksRepository.create({
        subtasks: [],
        comments: [],
        updates: [],
        labels: [],
        memberIds: [],
        ...task,
      }),
    );
    await this.tasksRepository.save(entities);
  }

  findAll(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  async findById(id: string): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  create(dto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.tasksRepository.create({
      id: `task-${randomUUID()}`,
      title: dto.title,
      status: dto.status,
      priority: 'no-priority',
      memberIds: [],
      labels: [],
      subtasks: [],
      comments: [],
      updates: [],
    });
    return this.tasksRepository.save(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findById(id);
    const merged = this.tasksRepository.merge(task, dto);
    return this.tasksRepository.save(merged);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (!result.affected) throw new NotFoundException(`Task ${id} not found`);
  }
}

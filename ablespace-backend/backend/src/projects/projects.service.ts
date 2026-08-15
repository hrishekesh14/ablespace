import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { ProjectEntity } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

const SEED_PROJECTS: Partial<ProjectEntity>[] = [
  {
    id: 'proj-1',
    name: 'Design Homepage',
    priority: 'high',
    leadId: 'admin',
    dueDate: '2026-09-12',
  },
  {
    id: 'proj-2',
    name: 'Develop Login Feature',
    priority: 'low',
    leadId: 'cn',
    dueDate: '2026-09-15',
  },
  { id: 'proj-3', name: 'Test Payment Gateway', priority: 'medium', dueDate: '2026-09-18' },
];

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  async seedIfEmpty(): Promise<void> {
    const count = await this.projectsRepository.count();
    if (count > 0) return;
    const entities = SEED_PROJECTS.map((project) => this.projectsRepository.create(project));
    await this.projectsRepository.save(entities);
  }

  findAll(): Promise<ProjectEntity[]> {
    return this.projectsRepository.find();
  }

  async findById(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  create(dto: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectsRepository.create({
      id: `proj-${randomUUID()}`,
      name: dto.name,
      priority: 'no-priority',
    });
    return this.projectsRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectEntity> {
    const project = await this.findById(id);
    const merged = this.projectsRepository.merge(project, dto);
    return this.projectsRepository.save(merged);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export const SEED_USERS: UserEntity[] = [
  {
    id: 'admin',
    name: 'Admin',
    email: 'admin@ablespace.io',
    avatarColor: '#7C3AED',
    initials: 'A',
  } as UserEntity,
  {
    id: 'dexter',
    name: 'Dexter',
    email: 'dexter@gmail.com',
    title: 'Designer',
    username: 'Dexuser',
    avatarColor: '#7C3AED',
    initials: 'D',
  } as UserEntity,
  {
    id: 'cn',
    name: 'Chloe Nguyen',
    email: 'chloe@ablespace.io',
    avatarColor: '#F59E0B',
    initials: 'CN',
  } as UserEntity,
  {
    id: 'ankit',
    name: 'Ankit Dutta',
    email: 'ankit@ablespace.io',
    avatarColor: '#7C3AED',
    initials: 'AD',
  } as UserEntity,
  {
    id: 'at',
    name: 'Aum Trivedi',
    email: 'aum@ablespace.io',
    avatarColor: '#FACC15',
    initials: 'AT',
  } as UserEntity,
];

export const CURRENT_USER_ID = 'dexter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async seedIfEmpty(): Promise<void> {
    const count = await this.usersRepository.count();
    if (count > 0) return;
    await this.usersRepository.save(SEED_USERS);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: string, patch: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.findById(id);
    const merged = this.usersRepository.merge(user, patch);
    return this.usersRepository.save(merged);
  }
}

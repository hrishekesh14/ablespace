import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text', { unique: true })
  email!: string;

  @Column('text', { nullable: true })
  title?: string;

  @Column('text', { nullable: true })
  username?: string;

  @Column('text')
  avatarColor!: string;

  @Column('text')
  initials!: string;
}

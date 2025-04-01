import { Resumes } from 'src/resumes/entity/resumes.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Resumes, (resumes) => resumes.user)
  resumes: Resumes[];
}
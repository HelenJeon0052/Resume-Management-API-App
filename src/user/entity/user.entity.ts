import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Resumes } from 'src/resumes/entity/resumes.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Roles } from '../enum/user.enum';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //@Index('user-email-idx')
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.User })
  roles: Roles = Roles.User;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Resumes, (resumes) => resumes.user)
  resumes: Resumes[];

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;
}
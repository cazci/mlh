import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: boolean;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn()
  user: User;
}

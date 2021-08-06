import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({
    select: false,
  })
  status: number;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn()
  user: User;
}

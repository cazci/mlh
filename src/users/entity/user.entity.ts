import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from '../../notes/entity/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}

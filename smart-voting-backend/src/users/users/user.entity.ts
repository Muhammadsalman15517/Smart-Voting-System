import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from 'src/votes/vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nic: string;

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];
}

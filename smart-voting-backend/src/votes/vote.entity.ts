import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/users/user.entity';
import { Option } from 'src/options/option.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.votes, { cascade: true, eager: true })
  user: User;

  @ManyToOne(() => Option, option => option.votes, { eager: true })
  option: Option;
}

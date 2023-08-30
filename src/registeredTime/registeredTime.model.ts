import { UserModel } from 'src/user/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'registered_time' })
export class RegisteredTimeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time_registered: Date;

  @Column({ default: false })
  isEntrance: boolean;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: number;
}

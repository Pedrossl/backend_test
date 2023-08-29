import { RegisteredTimeModel } from 'src/registeredTime/registeredTime.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 70 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ default: 'collaborator' })
  role?: string;

  @OneToMany(() => RegisteredTimeModel, (registeredTime) => registeredTime.user)
  registeredTimes: RegisteredTimeModel[];
}

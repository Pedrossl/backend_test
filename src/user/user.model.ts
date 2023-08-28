import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ length: 25 })
  role: string;
}

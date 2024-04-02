import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  user_permission_level: number;

  @Column({ type: "varchar", length: 80 })
  user_email: string;

  @Column({ type: "varchar", length: 80 })
  user_board: string;

  @Column({ type: "varchar", length: 254 })
  user_name: string;

  @Column({ type: "char", length: 80 })
  user_password: string;

  @Column({ default: true })
  is_active: boolean;
}
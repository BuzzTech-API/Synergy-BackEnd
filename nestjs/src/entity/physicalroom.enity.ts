import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Reserved } from './reserved.entity';

@Entity({ name: 'Salas Fisicas' })
export class PhysicalRoom {
  @PrimaryGeneratedColumn({ type: "int" })
  room_id: number;
  
  @Column({ type: "varchar", length: 80 })
  room_name: string;

  @Column({ type: "int" })
  room_permission_level: number;

  @Column({ type: "int" })
  room_vacancies: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'fk_Usuarios_user_id' })
  fk_Usuarios: User;

  @OneToOne(() => Reserved, reserved => reserved.physicalRoom)
  reserved: Reserved;
}
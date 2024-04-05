import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Reserved } from './reserved.entity';

@Entity({ name: 'Salas Virtuais' })
export class VirtualRoom {
  @PrimaryGeneratedColumn({ type: "int" })
  virtual_room_id: number;
  
  @Column({ type: "varchar", length: 80 })
  virtual_room_name: string;

  @Column({ type: "varchar", length: 254 })
  virtual_room_link: string
  
  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "int" })
  virtual_room_permission_level: number;
  
  @OneToOne((type) => User)
  @JoinColumn({ name: 'fk_Usuarios_user_id' })
  fk_Usuarios: User;

  @OneToOne(() => Reserved, reserved => reserved.virtualRoom)
  reserved: Reserved;
}
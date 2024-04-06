import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Reserveds } from './reserveds.entity';

@Entity({ name: 'Salas Virtuais' })
export class VirtualRooms {
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
  
  @OneToOne((type) => Users)
  @JoinColumn({ name: 'fk_Usuarios_user_id' })
  fk_Usuarios: Users;

  @OneToOne(() => Reserveds, reserveds => reserveds.virtualRoom)
  reserved: Reserveds;
}
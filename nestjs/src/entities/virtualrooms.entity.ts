import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservations } from './reservations.entity';

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

  @OneToMany(() => Reservations, reservation => reservation.virtualroom)
  reservation: Reservations[]

}
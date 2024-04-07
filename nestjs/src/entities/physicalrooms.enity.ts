import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Reservations } from './reservations.entity';

@Entity({ name: 'Salas Fisicas' })
export class PhysicalRooms {
  @PrimaryGeneratedColumn({ type: "int" })
  physical_room_id: number;
  
  @Column({ type: "varchar", length: 80 })
  physical_room_name: string;

  @Column({ type: "int" })
  physical_room_permission_level: number;

  @Column({ type: "int" })
  physical_room_vacancies: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Users, user => user.physicalRoom)
  @JoinColumn({ name: "user_id" })
  user: Users

  @OneToMany(() => Reservations, reservation => reservation.physicalroom)
  reservation: Reservations
}
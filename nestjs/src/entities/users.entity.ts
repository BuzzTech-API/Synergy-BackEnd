import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { PhysicalRooms } from './physicalrooms.enity';
import { Reservations } from './reservations.entity';
import { Participate } from './participate.entity';

@Entity({ name: 'Usuarios' })
export class Users {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  user_permission_level: number;

  @Column({ type: "varchar", length: 80, unique: true })
  user_email: string;

  @Column({ type: "varchar", length: 80 })
  user_board: string;

  @Column({ type: "varchar", length: 150 })
  user_name: string;

  @Column({ type: "char", length: 80 })
  user_password: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToOne(() => PhysicalRooms, physicalRooms => physicalRooms.user)
  physicalRoom: PhysicalRooms;

  @OneToMany(() => Reservations, reservations => reservations.user)
  reservations: Reservations[];

  @OneToMany(() => Participate, participate => participate.user)
  participate: Participate;
}
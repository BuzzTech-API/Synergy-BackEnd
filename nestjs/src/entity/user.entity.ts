import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { PhysicalRoom } from './physicalroom.enity';
import { Integrantes } from './integrantes.entity';
import { Reservations } from './reservations.entity';

@Entity({ name: 'Usuarios' })
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  user_permission_level: number;

  @Column({ type: "varchar", length: 80, unique: true })
  user_email: string;

  @Column({ type: "varchar", length: 80 })
  user_board: string;

  @Column({ type: "varchar", length: 254 })
  user_name: string;

  @Column({ type: "char", length: 80 })
  user_password: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => PhysicalRoom, physicalRoom => physicalRoom.fk_Usuarios)
  physicalRoom: PhysicalRoom;

  @OneToMany(() => Reservations, reservations => reservations.user)
  reservations: Reservations;

  @OneToOne(() => Integrantes, integrantes => integrantes.user)
  integrante: Integrantes[];
}
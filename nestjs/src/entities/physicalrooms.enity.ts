import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Reserveds } from './reserveds.entity';

@Entity({ name: 'Salas Fisicas' })
export class PhysicalRooms {
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

  @OneToOne((type) => Users)
  @JoinColumn({ name: 'fk_Usuarios_user_id' })
  fk_Usuarios: Users;

  @OneToOne(() => Reserveds, reserveds => reserveds.physicalRooms)
  reserved: Reserveds;
}
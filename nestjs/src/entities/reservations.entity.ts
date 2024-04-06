import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Meetings } from './meetings.entity';
import { Reserveds } from './reserveds.entity';

@Entity({ name: 'Reservas' })
export class Reservations {
  @PrimaryGeneratedColumn({ type: "int" })
  reserve_id: number;
  
  @Column({ type: "timestamp" })
  reserve_date: Date;

  @Column({ type: "timestamp" })
  reserve_start: Date;

  @Column({ type: "timestamp" })
  reserve_end: Date;

  @OneToOne(() => Users, user => user.user_id)
  @JoinColumn({ name: "fk_Usuarios_user_id" })
  user: Users

  @OneToOne(() => Meetings, meetings => meetings.meeting_id)
  @JoinColumn({ name: "fk_Reunioes_meeting_id" })
  meeting: Meetings

  @OneToOne(() => Reserveds, reserveds => reserveds.reservation)
  reserved: Reserveds[];
}
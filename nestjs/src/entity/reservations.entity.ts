import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Meetings } from './meetings.entity';
import { Reserved } from './reserved.entity';

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

  @OneToOne(() => User, user => user.user_id)
  @JoinColumn({ name: "fk_Usuarios_user_id" })
  user: User

  @OneToOne(() => Meetings, meetings => meetings.meeting_id)
  @JoinColumn({ name: "fk_Reunioes_meeting_id" })
  meeting: Meetings

  @OneToOne(() => Reserved, reserved => reserved.reservation)
  reserved: Reserved[];
}
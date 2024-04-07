import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Participate } from './participate.entity';
import { Reservations } from './reservations.entity';

@Entity({ name: 'Reunioes' })
export class Meetings {
  @PrimaryGeneratedColumn({ type: "int" })
  meeting_id: number;
  
  @Column({ type: "timestamp" })
  meeting_date: Date;

  @Column({ type: "timestamp" })
  meeting_time: Date;

  @Column({ type: "char", length: 80 })
  meeting_title: string;

  @Column({ type: "text" })
  meeting_subject: string;

  @Column({ type: "varchar", length: 60 })
  meeting_type: string;

  @OneToMany(() => Participate, participate => participate.meetings)
  participate: Participate[]

  @OneToOne(() => Reservations, reservations => reservations.meeting)
  @JoinColumn({ name: "reserve_id"})
  reservations: Reservations
}
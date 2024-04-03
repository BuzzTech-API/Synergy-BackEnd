import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Integrantes } from './integrantes.entity';
import { Reservations } from './reservations.entity';

@Entity({ name: 'Reunioes' })
export class Meetings {
  @PrimaryGeneratedColumn({ type: "int" })
  meeting_id: number;
  
  @Column({ type: "timestamp" })
  meeting_date: Date;

  @Column({ type: "timestamp" })
  meeting_time: Date;

  @Column({ type: "char" })
  meeting_title: string;

  @Column({ type: "text" })
  meeting_subject: string;

  @Column({ type: "varchar", length: 60 })
  meeting_type: string;

  @OneToOne(() => Integrantes, integrantes => integrantes.meetings)
  integrante: Integrantes[];

  @OneToMany(() => Reservations, reservations => reservations.meeting)
  reservations: Reservations;
}
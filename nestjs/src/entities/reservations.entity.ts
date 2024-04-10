import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Meetings } from './meetings.entity';
import { VirtualRooms } from './virtualrooms.entity';
import { PhysicalRooms } from './physicalrooms.enity';

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

  @ManyToOne(() => Users, user => user.reservations)
  @JoinColumn({ name: "user_id" })
  user: Users

  @OneToOne(() => Meetings, meetings => meetings.meeting_id)
  meeting: Meetings

  @ManyToOne(() => VirtualRooms, vroom => vroom.reservation, { nullable: true })
  @JoinColumn({ name: "virtual_room_id" })
  virtualroom: VirtualRooms | null

  @ManyToOne(() => PhysicalRooms, proom => proom.reservation, { nullable: true })
  @JoinColumn({ name: "physical_room_id" })
  physicalroom: PhysicalRooms | null
}
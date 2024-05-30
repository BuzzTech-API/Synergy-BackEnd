import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Meetings } from './meetings.entity';
import { Guests } from './guests.entity';

@Entity({ name: 'Presencia' })
export class Presence {
    @PrimaryColumn({ name: 'guest_id' })
    guest_id: number;

    @PrimaryColumn({ name: 'meeting_id' })
    meeting_id: number;

    @Column({ type: "varchar", length: 60 })
    guest_status: string;

    // relações -------------------------------------------------

    @ManyToOne(() => Guests, guest => guest.presence)
    @JoinColumn({ name: 'guest_id' })
    guest: Guests;

    @ManyToOne(() => Meetings, meetings => meetings.participate, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'meeting_id' })
    meetings: Meetings;

}
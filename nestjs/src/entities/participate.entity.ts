import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Users } from './users.entity';
import { Meetings } from './meetings.entity';

@Entity({ name: 'Participa' })
export class Participate {
    @PrimaryColumn({ name: 'user_id' })
    user_id: number;

    @PrimaryColumn({ name: 'meeting_id' })
    meeting_id: number;

    @Column({ type: "varchar", length: 60 })
    user_status: string;

    // relações -------------------------------------------------

    @ManyToOne(() => Users, user => user.participate)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @ManyToOne(() => Meetings, meetings => meetings.participate, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'meeting_id' })
    meetings: Meetings;

}
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Meetings } from './meetings.entity';
import { Guests } from './guests.entity';

@Entity({ name: 'Integrantes' })
export class Integrantes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 60 })
    members_mode: string;

    @Column({ type: "varchar", length: 60 })
    member_status: string;

    // relações -------------------------------------------------

    @ManyToOne(() => User, user => user.integrante)
    @JoinColumn({ name: 'fk_Usuarios_user_id' })
    user: User;

    @ManyToOne(() => Meetings, meetings => meetings.integrante)
    @JoinColumn({ name: 'fk_Reunioes_meeting_id' })
    meetings: Meetings;

    @ManyToOne(() => Guests, guest => guest.integrante)
    @JoinColumn({ name: 'fk_Convidados_guest_id' })
    guests: Guests;
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Presence } from './presence.entity';

@Entity({ name: 'Convidados' })
export class Guests {
    @PrimaryGeneratedColumn({ type: 'int' })
    guest_id: number;

    @Column({ type: "varchar", length: 254, unique: true })
    guest_email: string;

    @Column({ type: "varchar", length: 150 })
    guest_name: string;

    @OneToMany(() => Presence, presence => presence.guest)
    presence: Presence[];
}
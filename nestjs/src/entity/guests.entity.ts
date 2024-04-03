import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Integrantes } from './integrantes.entity';

@Entity({ name: 'Convidados' })
export class Guests {
    @PrimaryGeneratedColumn({ type: 'int' })
    guest_id: number;

    @Column({ type: "varchar", length: 254, unique: true })
    guest_email: string;

    @Column({ type: "varchar", length: 80 })
    guest_name: string;

    @OneToMany(() => Integrantes, integrantes => integrantes.guests)
    integrante: Integrantes[];
}
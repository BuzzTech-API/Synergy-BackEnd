import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Reservations } from './reservations.entity';
import { PhysicalRoom } from './physicalroom.enity';
import { VirtualRoom } from './virtualroom.entity';

@Entity({ name: 'Reservadas' })
export class Reserved {
    @PrimaryGeneratedColumn() // primary key necesseária por limitação da biblioteca
    id: number;

    @ManyToOne(() => Reservations, reservation => reservation.reserved)
    @JoinColumn({ name: 'fk_Reservas_reserve_id' })
    reservation: Reservations;

    @OneToOne(() => PhysicalRoom, physicalRoom => physicalRoom.reserved)
    @JoinColumn({ name: 'fk_Salas_Fisicas_room_id' })
    physicalRoom: PhysicalRoom;

    @OneToOne(() => VirtualRoom, virtualRoom => virtualRoom.reserved)
    @JoinColumn({ name: 'fk_Salas_Virtuais_virtual_room_id' })
    virtualRoom: VirtualRoom;
}
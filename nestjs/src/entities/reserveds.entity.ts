import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Reservations } from './reservations.entity';
import { PhysicalRooms } from './physicalrooms.enity';
import { VirtualRooms } from './virtualrooms.entity';

@Entity({ name: 'Reservadas' })
export class Reserveds {
    @PrimaryGeneratedColumn() // primary key necesseária por limitação da biblioteca
    id: number;

    @ManyToOne(() => Reservations, reservation => reservation.reserved)
    @JoinColumn({ name: 'fk_Reservas_reserve_id' })
    reservation: Reservations;

    @OneToOne(() => PhysicalRooms, physicalRooms => physicalRooms.reserved)
    @JoinColumn({ name: 'fk_Salas_Fisicas_room_id' })
    physicalRooms: PhysicalRooms;

    @OneToOne(() => VirtualRooms, virtualRooms => virtualRooms.reserved)
    @JoinColumn({ name: 'fk_Salas_Virtuais_virtual_room_id' })
    virtualRoom: VirtualRooms;
}
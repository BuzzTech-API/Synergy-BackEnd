import { Module } from '@nestjs/common';
import { ReservationsController } from './controller/reservations/reservations.controller';
import { ReservationsService } from './service/reservations/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entities/reservations.entity';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';
import { VirtualRooms } from 'src/entities/virtualrooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations, PhysicalRooms, VirtualRooms])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}

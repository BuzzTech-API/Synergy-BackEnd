import { Module } from '@nestjs/common';
import { ReservationsController } from './controller/reservations/reservations.controller';
import { ReservationsService } from './service/reservations/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entities/reservations.entity';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations, PhysicalRooms])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}

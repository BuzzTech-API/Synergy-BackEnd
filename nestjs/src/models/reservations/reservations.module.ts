import { Module } from '@nestjs/common';
import { ReservationsController } from './controller/reservations/reservations.controller';
import { ReservationsService } from './service/reservations/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entities/reservations.entity';
import { PhysicalroomsModule } from '../physicalrooms/physicalrooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations]), PhysicalroomsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}

import { Module } from '@nestjs/common';
import { ReservationsController } from './controller/reservations/reservations.controller';
import { ReservationsService } from './service/reservations/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entities/reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}

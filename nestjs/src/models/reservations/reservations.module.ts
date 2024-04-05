import { Module } from '@nestjs/common';
import { ReservationsController } from './controller/reservations/reservations.controller';
import { ReservationsService } from './service/reservations/reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}

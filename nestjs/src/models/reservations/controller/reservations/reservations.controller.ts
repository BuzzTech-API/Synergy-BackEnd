import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateReservationsDto } from 'src/common/dtos/CreateReservations.dto';
import { ReservationsService } from '../../service/reservations/reservations.service';

@Controller('reservations')
export class ReservationsController {

  constructor(private reservationsService: ReservationsService) { }

  @HttpCode(200)
  @Get()
  async getReservarions() {
    const reservations = await this.reservationsService.getReservation();
    return reservations
  }

  @HttpCode(201)
  @Post('/physicalroom')
  createReservation(@Body() createReservationsDto: CreateReservationsDto) {
    return this.reservationsService.createPhysicalRoomReservation(createReservationsDto);
  }
}

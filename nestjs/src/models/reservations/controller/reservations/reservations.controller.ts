import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import {
  CreateHibridReservationsDto,
  CreateReservationsDto,
  CreateVirtualReservationsDto,
} from 'src/common/dtos/CreateReservations.dto';
import { ReservationsService } from '../../service/reservations/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) { }

  @HttpCode(200)
  @Get()
  async getReservaions() {
    const reservations = await this.reservationsService.getReservation();
    return reservations;
  }

  @HttpCode(200)
  @Get('/:id')
  async getReservationById(@Param('id') reservation_id: number) {
    const reservation = await this.reservationsService.getReservationById(reservation_id);
    return reservation;
  }

  @HttpCode(200)
  @Delete('/:id')
  async deleteReservation(@Param('id') reservation_id: number) {
    await this.reservationsService.deleteReservation(reservation_id);
  }

  @HttpCode(201)
  @Post('/physicalroom')
  createReservationPhysical(
    @Body() createReservationsDto: CreateReservationsDto,
    @Req() req,
  ) {
    return this.reservationsService.createPhysicalRoomReservation(
      createReservationsDto,
      req.user,
    );
  }

  @HttpCode(201)
  @Post('/virtualroom')
  createReservationVirtual(
    @Body() createReservationsDto: CreateVirtualReservationsDto,
    @Req() req,
  ) {
    return this.reservationsService.createVirtualRoomReservation(
      createReservationsDto,
      req.user,
    );
  }


  @HttpCode(201)
  @Post('/hibrid')
  createReservationHibrid(
    @Body() createReservationsDto: CreateHibridReservationsDto,
    @Req() req,
  ) {
    return this.reservationsService.createHibridReservation(
      createReservationsDto,
      req.user,
    )
  }
}

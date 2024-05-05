import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
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
  async getReservarions() {
    const reservations = await this.reservationsService.getReservation();
    return reservations;
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
    return this.reservationsService.createVirtualRoomReservation(
      createReservationsDto,
      req.user,
    )
  }
}

/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { PhysicalroomsService } from '../../service/physicalrooms/physicalrooms.service';


@Controller('physicalrooms')
export class PhysicalroomsController {
  constructor(private physicalroomsService: PhysicalroomsService) {}

  @Get()
  async getPhysicalrooms() {
    const physicalrooms = await this.physicalroomsService.getPhysicalrooms();
    return physicalrooms;
  }

  @Get(':id') // pega o id da rota /physicalrooms/{id}
  async getPhysicalroomById(@Param('id', ParseIntPipe) id: number) { // usa os id da rota (ParseIntPipe): garante que o id é um numero
      try {
          const physicalroom = await this.physicalroomsService.getPhysicalroomById(id)
          return physicalroom
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.CONFLICT)
      }
  }


  @Get('/reservations/:id') // physicalrooms/reservations/{id}
  async getPhysicalroomReservationsById(@Param('id', ParseIntPipe) id: number) { // usa os id da rota (ParseIntPipe): garante que o id é um numero
      try {
          const physicalroom = await this.physicalroomsService.getPhysicalroomReservationsById(id)
          return physicalroom
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.CONFLICT)
      }
  }

}

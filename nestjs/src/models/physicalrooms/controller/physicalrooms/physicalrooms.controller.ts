import { Body, Controller, Header, HttpException, HttpStatus, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePhysicalroomDto } from 'src/common/dtos/CreatePhysicalroom.dto';
import { PhysicalroomsService } from '../../service/physicalrooms/physicalrooms.service';


@Controller('physicalrooms')
export class PhysicalroomsController {
  constructor(private physicalroomsService: PhysicalroomsService) {}
  
    @Post()
    @Header('Content-Type', 'application/json')
    async createPhysicalroom(@Body() createPhysicalroomDto:CreatePhysicalroomDto) {
        try{
            const newPhysicalroom = await this.physicalroomService.createPhysicalroom(createPhysicalroomDto)
            return newPhysicalroom
        } catch(error){
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

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

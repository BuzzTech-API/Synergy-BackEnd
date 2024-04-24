import { Body, Controller, Header, HttpException, HttpStatus, Post, Get, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { CreatePhysicalroomDto } from 'src/common/dtos/CreatePhysicalroom.dto';
import { PhysicalroomsService } from '../../service/physicalrooms/physicalrooms.service';


@Controller('physicalrooms')
export class PhysicalroomsController {
    constructor(private physicalroomsService: PhysicalroomsService) { }

    @HttpCode(201)
    @Post()
    @Header('Content-Type', 'application/json')
    async createPhysicalroom(@Body() createPhysicalroomDto: CreatePhysicalroomDto) {
        const newPhysicalroom = await this.physicalroomsService.createPhysicalroom(createPhysicalroomDto)
        return newPhysicalroom
    }

    @HttpCode(200)
    @Get()
    async getPhysicalrooms() {
        const physicalrooms = await this.physicalroomsService.getPhysicalrooms();
        return physicalrooms;
    }

    @HttpCode(200)
    @Get(':id') // pega o id da rota /physicalrooms/{id}
    async getPhysicalroomById(@Param('id', ParseIntPipe) id: number) { // usa os id da rota (ParseIntPipe): garante que o id é um numero
        const physicalroom = await this.physicalroomsService.getPhysicalroomById(id)
        return physicalroom
    }


    @Get('/reservations/:id') // physicalrooms/reservations/{id}
    async getPhysicalroomReservationsById(@Param('id', ParseIntPipe) id: number) { // usa os id da rota (ParseIntPipe): garante que o id é um numero
        const physicalroom = await this.physicalroomsService.getPhysicalroomReservationsById(id)
        return physicalroom
    }
}

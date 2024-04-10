import { Body, Controller, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreatePhysicalroomDto } from 'src/common/dtos/CreatePhysicalroom.dto';
import { PhysicalroomsService } from '../../service/physicalrooms/physicalrooms.service';

@Controller('physicalrooms')
export class PhysicalroomsController {

    constructor(private physicalroomService: PhysicalroomsService){}
    
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
    
}

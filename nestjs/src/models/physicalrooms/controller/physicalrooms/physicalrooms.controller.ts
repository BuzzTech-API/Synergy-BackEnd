import { Body, Controller, Post } from '@nestjs/common';
import { CreatePhysicalroomDto } from 'src/common/dtos/CreatePhysicalroom.dto';
import { PhysicalroomsService } from '../../service/physicalrooms/physicalrooms.service';

@Controller('physicalrooms')
export class PhysicalroomsController {

    constructor(private physicalroomService: PhysicalroomsService){}
    
    @Post()
    createPhysicalroom(@Body() createPhysicalroomDto:CreatePhysicalroomDto) {
        this.physicalroomService.createPhysicalroom()
    }
    
}

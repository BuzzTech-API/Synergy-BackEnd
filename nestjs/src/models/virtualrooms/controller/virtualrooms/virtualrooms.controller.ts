import { Body, Controller, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateVirtualRoomDto } from 'src/common/dtos/CreateVirtualRoom.dto';
import { VirtualroomsService } from 'src/models/virtualrooms/service/virtualrooms/virtualrooms.service';

@Controller('virtualrooms')
export class VirtualroomsController {
    constructor(private virtualRoomService: VirtualroomsService) { }

    @Post()
    @Header('Content-Type', 'application/json')
    async createVirtualRoom(@Body() createVirtualRoomDto: CreateVirtualRoomDto) {
        try {
            const newVirtualRoom = await this.virtualRoomService.createVirtualRoom(createVirtualRoomDto);
            return newVirtualRoom
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }
}

import { Body, Controller, Header, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateVirtualRoomDto } from 'src/common/dtos/CreateVirtualRoom.dto';
import { VirtualroomsService } from 'src/models/virtualrooms/service/virtualrooms/virtualrooms.service';

@Controller('virtualrooms')
export class VirtualroomsController {
    constructor(private virtualRoomService: VirtualroomsService) { }

    @Post()
    @HttpCode(201)
    @Header('Content-Type', 'application/json')
    async createVirtualRoom(@Body() createVirtualRoomDto: CreateVirtualRoomDto) {
        const newVirtualRoom = await this.virtualRoomService.createVirtualRoom(createVirtualRoomDto);
        return newVirtualRoom
    }
}

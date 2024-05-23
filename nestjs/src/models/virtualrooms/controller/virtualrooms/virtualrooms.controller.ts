import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateVirtualRoomDto } from 'src/common/dtos/CreateVirtualRoom.dto';
import { UpdateVirtualRoomDto } from 'src/common/dtos/UpdateVirtualroom.dto';
import { VirtualroomsService } from 'src/models/virtualrooms/service/virtualrooms/virtualrooms.service';

@Controller('virtualrooms')
export class VirtualroomsController {
    constructor(private virtualRoomService: VirtualroomsService) { }

    @Post()
    @HttpCode(201)
    @Header('Content-Type', 'application/json')
    async createVirtualRoom(
        @Body() createVirtualRoomDto: CreateVirtualRoomDto,
    ) {
        const newVirtualRoom =
            await this.virtualRoomService.createVirtualRoom(
                createVirtualRoomDto,
            );
        return newVirtualRoom;
    }

    @HttpCode(200)
    @Get()
    async getVirtualRooms() {
        const virtualRooms = await this.virtualRoomService.getVirtualRooms();
        return virtualRooms;
    }

    @HttpCode(200)
    @Put(':id')
    async deleteVirtualRoom(@Param('id', ParseIntPipe) id: number) {
        const virtualroom = await this.virtualRoomService.deleteVirtualRoom(id)
        return virtualroom
    }
    
    @HttpCode(200)
    @Put()
    async updateVirtualRoom(@Body() updateVirtualroomDto: UpdateVirtualRoomDto) {
        const Virtualroom = await this.virtualRoomService.updateVirtualRoom(updateVirtualroomDto)
        return Virtualroom
    }
}


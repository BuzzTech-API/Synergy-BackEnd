import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GuestsService } from '../../service/guests/guests.service';
import { CreateGuestDto } from 'src/common/dtos/CreateGuest.dto';

@Controller('guests')
export class GuestsController {
    constructor(private guestService: GuestsService) {}

    @HttpCode(201)
    @Post()
    createGuest(@Body() createGuestDto: CreateGuestDto) {
      return this.guestService.createGuest(createGuestDto);
    }
}

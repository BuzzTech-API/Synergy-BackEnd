import { Body, Controller, Post } from '@nestjs/common';
import { GuestsService } from '../../service/guests/guests.service';
import { CreateGuestDto } from 'src/common/dtos/CreateGuest.dto';

@Controller('guests')
export class GuestsController {
    constructor(private guestService: GuestsService) {}

    
    @Post()
    createGuest(@Body() createGuestDto: CreateGuestDto) {
      return this.guestService.createGuest(createGuestDto);
    }
}

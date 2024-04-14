import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MeetingsService } from '../../service/meetings/meetings.service';
import { CreateMeetingDto } from 'src/common/dtos/CreateMeeting.dto';
import { CreateParticipateDto } from 'src/common/dtos/CreateParticipate.dto';
import { CreatePresenceDto } from 'src/common/dtos/CreatePresence.dto';

@Controller('meetings')
export class MeetingsController {
    constructor(private meetingsService: MeetingsService) {}


    @Post()
    createMeeting(@Body() createMeetingDto: CreateMeetingDto) {
      return this.meetingsService.createMeetings(createMeetingDto)
    }

    @Post('/users')
    async createParticipateMeeting(@Body() createParticipateMeetingDto: CreateParticipateDto, @Res() res: Response){
      try {
        const participate = await this.meetingsService.createParticipateMeetings(createParticipateMeetingDto)
        res.status(HttpStatus.OK).send('Participações criadas com sucesso.');
        return participate
      } catch (error) {
        res.status(HttpStatus.CONFLICT).send(error.message)
      }
    }

    @Post('/guests')
    async createPresenceMeeting(@Body() createPresenceMeetingDto: CreatePresenceDto, @Res() res: Response){
      try {
        const presence = await this.meetingsService.createPresenceMeetings(createPresenceMeetingDto)
        res.status(HttpStatus.OK).send('Presenças criadas com sucesso.');
        return presence
      } catch (error) {
        res.status(HttpStatus.CONFLICT).send(error.message)
      }
    }

}

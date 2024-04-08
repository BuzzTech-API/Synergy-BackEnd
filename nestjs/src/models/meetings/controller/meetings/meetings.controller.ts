import { Body, Controller, Post } from '@nestjs/common';
import { MeetingsService } from '../../service/meetings/meetings.service';
import { CreateMeetingDto } from 'src/common/dtos/CreateMeeting.dto';

@Controller('meetings')
export class MeetingsController {
    constructor(private meetingsService: MeetingsService) {}


    @Post()
    createMeeting(@Body() createMeetingDto: CreateMeetingDto) {
      return this.meetingsService.createMeetings(createMeetingDto)
    }
}

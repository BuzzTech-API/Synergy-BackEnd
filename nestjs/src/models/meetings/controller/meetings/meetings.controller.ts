import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MeetingsService } from '../../service/meetings/meetings.service';
import { CreateMeetingDto } from 'src/common/dtos/CreateMeeting.dto';
import { CreateParticipateDto } from 'src/common/dtos/CreateParticipate.dto';
import { CreatePresenceDto } from 'src/common/dtos/CreatePresence.dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private meetingsService: MeetingsService) { }

  @HttpCode(201)
  @Post()
  createMeeting(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.createMeetings(createMeetingDto);
  }

  @HttpCode(201)
  @Post('/users')
  async createParticipateMeeting(
    @Body() createParticipateMeetingDto: CreateParticipateDto,
  ) {
    const participate = await this.meetingsService.createParticipateMeetings(
      createParticipateMeetingDto,
    );
    return participate;
  }

  @HttpCode(201)
  @Post('/guests')
  async createPresenceMeeting(
    @Body() createPresenceMeetingDto: CreatePresenceDto,
  ) {
    const presence = await this.meetingsService.createPresenceMeetings(createPresenceMeetingDto)
    return presence;
  }
}

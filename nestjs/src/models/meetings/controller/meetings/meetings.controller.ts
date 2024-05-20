import { Body, Controller, Delete, HttpCode, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
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

  @HttpCode(200)
  @Put('/updatePresence')
  async updatePresenceMeeting(
    @Req() req,
  ) {
    const presence = await this.meetingsService.updateParticipate(req.user)
    return presence
  }

  @HttpCode(204)
  @Delete('/deleteMeeting/:meeting_id')
  async deleteMeeting(@Param('meeting_id') meeting_id: number) {
    await this.meetingsService.removeMeeting(meeting_id);
  }
}

import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
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

  @HttpCode(200)
  @Get('/participate/:meeting_id')
  async getPaticipate(@Param('meeting_id') meeting_id: number) {
    return await this.meetingsService.getParticipateMeeting(meeting_id);
  }

  @HttpCode(200)
  @Get()
  async getMeeting() {
    const meetings = await this.meetingsService.getMeetings();
    return meetings;
  }

  @HttpCode(200)
  @Get()
  async getMeetingById() {
    const meetings = await this.meetingsService.getMeetings();
    return meetings;
  }
}

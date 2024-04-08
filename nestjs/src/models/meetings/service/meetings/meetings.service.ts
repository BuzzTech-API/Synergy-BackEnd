import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMeetingParams } from 'src/common/utils/types';
import { Meetings } from 'src/entities/meetings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
    constructor(
        @InjectRepository(Meetings)
        private meetingsRepository: Repository<Meetings>,
      ) {}


      createMeetings(meetingDetails: CreateMeetingParams) {
        const newMeeting = this.meetingsRepository.create(meetingDetails)
        return this.meetingsRepository.save(newMeeting)
      }
}

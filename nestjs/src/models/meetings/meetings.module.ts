import { Module } from '@nestjs/common';
import { MeetingsController } from './controller/meetings/meetings.controller';
import { MeetingsService } from './service/meetings/meetings.service';

@Module({
  controllers: [MeetingsController],
  providers: [MeetingsService]
})
export class MeetingsModule {}

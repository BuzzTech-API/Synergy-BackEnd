import { Module } from '@nestjs/common';
import { MeetingsController } from './controller/meetings/meetings.controller';
import { MeetingsService } from './service/meetings/meetings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetings } from 'src/entities/meetings.entity';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meetings]), ReservationsModule],
  controllers: [MeetingsController],
  providers: [MeetingsService]
})
export class MeetingsModule {}

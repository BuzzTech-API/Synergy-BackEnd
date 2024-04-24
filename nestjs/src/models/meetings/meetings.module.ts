import { Module } from '@nestjs/common';
import { MeetingsController } from './controller/meetings/meetings.controller';
import { MeetingsService } from './service/meetings/meetings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetings } from 'src/entities/meetings.entity';
import { Participate } from 'src/entities/participate.entity';
import { Users } from 'src/entities/users.entity';
import { Guests } from 'src/entities/guests.entity';
import { Presence } from 'src/entities/presence.entity';
import { Reservations } from 'src/entities/reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meetings, Participate, Users, Guests, Presence, Reservations])],
  controllers: [MeetingsController],
  providers: [MeetingsService]
})
export class MeetingsModule {}

import { Module } from '@nestjs/common';
import { GuestsController } from './controller/guests/guests.controller';
import { GuestsService } from './service/guests/guests.service';
import { Guests } from 'src/entities/guests.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Guests])],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class GuestsModule {}

import { Module } from '@nestjs/common';
import { ZoomController } from './controller/zoom/zoom.controller';
import { ZoomService } from './service/zoom/zoom.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ZoomController],
  providers: [ZoomService],
  imports: [ConfigModule, HttpModule],
})
export class ZoomModule {}

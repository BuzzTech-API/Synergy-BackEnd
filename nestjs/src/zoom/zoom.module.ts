import { Module } from '@nestjs/common';
import { ZoomController } from './controller/zoom/zoom.controller';
import { ZoomService } from './service/zoom/zoom.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ZoomController],
  providers: [ZoomService],
  imports: [ConfigModule]
})

export class ZoomModule {

}

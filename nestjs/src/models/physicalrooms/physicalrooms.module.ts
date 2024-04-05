import { Module } from '@nestjs/common';
import { PhysicalroomsController } from './controller/physicalrooms/physicalrooms.controller';
import { PhysicalroomsService } from './service/physicalrooms/physicalrooms.service';

@Module({
  controllers: [PhysicalroomsController],
  providers: [PhysicalroomsService]
})
export class PhysicalroomsModule {}

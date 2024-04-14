import { Module } from '@nestjs/common';
import { PhysicalroomsController } from './controller/physicalrooms/physicalrooms.controller';
import { PhysicalroomsService } from './service/physicalrooms/physicalrooms.service';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalRooms])],
  controllers: [PhysicalroomsController],
  providers: [PhysicalroomsService],
  exports: [PhysicalroomsService]
})
export class PhysicalroomsModule {}

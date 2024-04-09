import { Module } from '@nestjs/common';
import { PhysicalroomsController } from './controller/physicalrooms/physicalrooms.controller';
import { PhysicalroomsService } from './service/physicalrooms/physicalrooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalRooms])],
  controllers: [PhysicalroomsController],
  providers: [PhysicalroomsService]
})
export class PhysicalroomsModule {}

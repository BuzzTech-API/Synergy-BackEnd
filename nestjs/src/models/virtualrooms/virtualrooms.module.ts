import { Module } from '@nestjs/common';
import { VirtualroomsController } from './controller/virtualrooms/virtualrooms.controller';
import { VirtualroomsService } from './service/virtualrooms/virtualrooms.service';
import { VirtualRooms } from 'src/entities/virtualrooms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualRooms])],
  controllers: [VirtualroomsController],
  providers: [VirtualroomsService]
})
export class VirtualroomsModule {}

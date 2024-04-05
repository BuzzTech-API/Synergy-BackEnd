import { Module } from '@nestjs/common';
import { VirtualroomsController } from './controller/virtualrooms/virtualrooms.controller';
import { VirtualroomsService } from './service/virtualrooms/virtualrooms.service';
import { VirtualRoom } from 'src/entities/virtualroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualRoom])],
  controllers: [VirtualroomsController],
  providers: [VirtualroomsService]
})
export class VirtualroomsModule {}

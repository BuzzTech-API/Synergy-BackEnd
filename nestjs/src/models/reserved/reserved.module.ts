import { Module } from '@nestjs/common';
import { ReservedController } from './controller/reserved/reserved.controller';
import { ReservedService } from './service/reserved/reserved.service';

@Module({
  controllers: [ReservedController],
  providers: [ReservedService]
})
export class ReservedModule {}

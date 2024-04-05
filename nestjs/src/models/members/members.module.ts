import { Module } from '@nestjs/common';
import { MembersController } from './controller/members/members.controller';
import { MembersService } from './service/members/members.service';

@Module({
  controllers: [MembersController],
  providers: [MembersService]
})
export class MembersModule {}

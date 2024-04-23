import { Module } from '@nestjs/common';
import { MailerController } from './controller/mailer/mailer.controller';
import { MailerService } from './service/mailer/mailer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MailerController],
  providers: [MailerService]
})
export class MailerModule {}

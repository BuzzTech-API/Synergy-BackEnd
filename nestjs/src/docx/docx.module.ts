import { Module } from '@nestjs/common';
import { DocxController } from './controller/docx/docx.controller';
import { DocxService } from './service/docx/docx.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/service/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MailerModule],
  controllers: [DocxController],
  providers: [DocxService, MailerService, ConfigService]
})
export class DocxModule {}

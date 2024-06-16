import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { ScheduleEmailDto, SendEmailDto } from 'src/common/dtos/SendEmail.dto';
import { MailerService } from 'src/mailer/service/mailer/mailer.service';

@Controller('mailer')
export class MailerController {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    @HttpCode(200)
    @Post()
    async sendMail(@Body() sendEmailDto: SendEmailDto) {
        return this.mailerService.sendEmail(sendEmailDto)
    }

    @Post('schedule')
    scheduleEmail(@Body() scheduleEmailDto: ScheduleEmailDto) {
        const { date, mailOptions } = scheduleEmailDto;
        return this.mailerService.scheduleEmail(mailOptions, date);
    }
}

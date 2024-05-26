import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AtaDto } from 'src/common/dtos/Ata.dto';
import { EmailWithAta } from 'src/common/dtos/EmailWithAta.dto';
import { SendEmailDto } from 'src/common/dtos/SendEmail.dto';
import { DocxService } from 'src/docx/service/docx/docx.service';

@Controller('docx')
export class DocxController {
    constructor(
        private readonly docxService: DocxService
    ){}

    @HttpCode(200)
    @Post()
    async makeAta(@Body() emailWithAtaDto: EmailWithAta) {

        return this.docxService.sendAta(emailWithAtaDto.ataDetails, emailWithAtaDto.emailDetails)
    }
}

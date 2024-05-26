
import { Injectable } from '@nestjs/common';
import { populateAta, SendEmail } from 'src/common/utils/types';
import { MailerService } from 'src/mailer/service/mailer/mailer.service';

@Injectable()
export class DocxService {
    constructor(
        private mailerService: MailerService
    ){ }
    

    // essa função popula a ata e já envia o email automaticamente
    sendAta(ataInfo: populateAta, emailDetails: SendEmail){
        // Precisa do pizzip pq arquivos docx são  arquivos zipados
        // e o pizzip permite que a gnt carregue o arquivo na memoria
        const PizZip = require("pizzip");
        const Docxtemplater = require("docxtemplater");

        const fs = require("fs");
        const path = require("path");

        //Carrega o docx como um conteúdo binário
        const content = fs.readFileSync(
            //não muda esse path pelo amor de deus
            path.resolve("/usr/src/app/src/docx/service/ata", "./ata.docx"),
            "binary"
        );
        


        //unzip o conteúdo
        const zip = new PizZip(content);

        // Isso analiza o template e joga um erro se o template for
        // invalido, por exemplo, se o template é "{user" (sem tag de fechamento)
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });


        // Renderiza o documento (Aqui que ele vai fazer as substituições )
        doc.render({
            assunto: ataInfo.assunto,
            data: ataInfo.data,
            horario: ataInfo.horario,
            local: ataInfo.local,
            relator: ataInfo.relator,
            participantes: ataInfo.participantes
        });

        //ai que vem a pica de como eu salvo de uma forma que mande no email

        // Pega o documento zipado e gera ele com um nodebuffer
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });

        //salva como um attachment para enviar no email
        const attachment = {
            filename: 'ATA.docx',
            //buffer
            content: buf
        }
        
        //chama a função de enviar email
        this.mailerService.sendEmailWithAttachment(emailDetails, attachment)

        // Descomente isso e comente o de cima para o output sair na pasta "ata" que está dentro de /docx/service para debug
        // fs.writeFileSync(path.resolve("/usr/src/app/src/docx/service/ata", "output.docx"), buf);
        

    } 
}

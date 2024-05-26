import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { SendEmail } from 'src/common/utils/types';

@Injectable()
export class MailerService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    mailTransport() {
        try {
            const transporter = nodemailer.createTransport({ // Configurações do servidor de email
                host: this.configService.get<string>('MAIL_HOST'), // Obtém o host do servidor de email
                port: this.configService.get<number>('MAIL_PORT'), // Obtém a porta do servidor de email
                secure: true, // Define se a conexão deve ser segura. Aqui, estamos usando `false` para todas as portas, exceto 465 (que seria `true`)
                auth: {
                    // Configurações de autenticação do servidor de email
                    user: this.configService.get<string>('MAIL_USER'),
                    pass: this.configService.get<string>('MAIL_PASSWORD'),
                },
            })
            
            return transporter // Retorna o transporte de email configurado
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async sendEmail(emailDetails: SendEmail) {
        let info = this.mailTransport() // Chama a função mailTransport para obter o transporte de email configurado

        const options: Mail.Options = { // Configura as opções para o email a ser enviado
            from: { 
                name: this.configService.get<string>('DAFAULT_MAIL_SENDER'), // Define o nome do remetente
                address: this.configService.get<string>('DEFAULT_MAIL_FROM'), // Define o endereço de email do remetente
            },
            to: emailDetails.recipients, // Define os destinatários do email com base nas informações fornecidas
            subject: emailDetails.subject, // Define o assunto do email
            html: emailDetails.html, // Define o corpo HTML do email
            text: emailDetails.text // Este é o conteúdo do email em formato de texto simples
        }   

        try {
            const result = await info.sendMail(options)
            return result
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}

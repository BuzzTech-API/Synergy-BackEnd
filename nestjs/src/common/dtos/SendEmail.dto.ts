import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from "class-validator";

class mailRecipient {
    @IsNotEmpty({ message: "O nome não pode estar vazio" })
    name: string

    @IsNotEmpty({ message: "O endereço de e-mail não pode estar vazio" })
    @IsEmail({}, { message: "O endereço de e-mail deve ser válido" })
    address: string
}

export class SendEmailDto {

    @IsNotEmpty({ message: "A lista de destinatários não pode estar vazia" })
    @IsArray({ message: "A lista de destinatários deve ser um array" })
    @ValidateNested({ each: true })
    @Type(() => mailRecipient)
    recipients: mailRecipient[]

    @IsNotEmpty({ message: "O assunto não pode estar vazio" })
    subject: string

    @IsNotEmpty({ message: "O conteúdo HTML não pode estar vazio" })
    html: string

    text?: string

}

export class ScheduleEmailDto {

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    mailOptions: SendEmailDto
}
import { IsNotEmpty } from "class-validator";
import { AtaDto } from "./Ata.dto";
import { SendEmailDto } from "./SendEmail.dto";
import { Type } from "class-transformer";

export class EmailWithAta {
    @IsNotEmpty()
    @Type(() => SendEmailDto)
    emailDetails: SendEmailDto
    @IsNotEmpty()
    @Type(() => AtaDto)
    ataDetails: AtaDto
}

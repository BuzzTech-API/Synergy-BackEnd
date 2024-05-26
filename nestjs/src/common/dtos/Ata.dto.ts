import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator"

class participante {
    @IsNotEmpty({ message: "O nome não pode estar vazio" })
    name: string

    @IsNotEmpty({ message: "O endereço de e-mail não pode estar vazio" })
    @IsEmail({}, { message: "O endereço de e-mail deve ser válido" })
    address: string
}

export class AtaDto {

    @IsString()
    assunto: string
    @IsString()
    data: string
    @IsString()
    horario: string
    @IsString()
    local: string
    @IsString()
    relator: string
    @IsArray()
    participantes: participante[]
}
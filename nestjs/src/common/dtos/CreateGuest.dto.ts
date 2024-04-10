import { IsNotEmpty, IsString, MaxLength, IsEmail } from "class-validator"

export class CreateGuestDto { // Modelo para os dados que chegam das rotas
    
    @IsNotEmpty()//verifica se é vazio
    @IsString()//verifica se é string(se não for não aceita)
    @MaxLength(254)//tamanho maximo da string
    guest_name: string

    @IsEmail()//verifica se é um email
    @MaxLength(80)
    guest_email: string
}
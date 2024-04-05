import { IsAlpha, IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min } from "class-validator"

export class CreateUserDto { // Modelo para os dados que chegam das rotas
    
    @IsNotEmpty()//verifica se é vazio
    @IsString()//verifica se é string(se não for não aceita)
    @IsAlpha()//verifica se tem apenas letras (a-zA-Z)
    @MaxLength(254)//tamanho maximo da string
    user_name: string

    @IsNotEmpty()
    @IsString()
    user_password: string

    @IsEmail()//verifica se é um email
    @MaxLength(80)
    user_email: string

    @IsNotEmpty()
    @Min(1)//numero minimo 1
    @Max(3)//numero maximo 3   vai de 1 até 3
    user_permission_level: number

    @IsNotEmpty()
    @MaxLength(80)
    user_board: string
}
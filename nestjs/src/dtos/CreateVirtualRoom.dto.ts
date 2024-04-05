import { IsAlpha, IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min } from "class-validator"

export class CreateVirtualRoomDto { // Modelo para os dados que chegam das rotas
    
    @IsNotEmpty()//verifica se é vazio
    @IsString()//verifica se é string(se não for não aceita)
    @MaxLength(80)//tamanho maximo da string
    virtual_room_name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(254)
    virtual_room_link: string

    @IsNotEmpty()
    @Min(1)//numero minimo 1
    @Max(3)//numero maximo 3   vai de 1 até 3
    virtual_room_permission_level: number
}
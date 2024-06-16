import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  // Modelo para os dados que chegam das rotas

  @IsNotEmpty() //verifica se é vazio
  @Min(1)
  @IsNumber() //verifica se é numero(se não for não aceita)
  user_id: number;

  @IsNotEmpty() //verifica se é vazio
  @IsString() //verifica se é string(se não for não aceita)
  @MaxLength(254) //tamanho maximo da string
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_password: string;

  @IsEmail() //verifica se é um email
  @MaxLength(80)
  user_email: string;
}

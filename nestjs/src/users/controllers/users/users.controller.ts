import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    //rotas de usuarios aqui
    //Ex: @Get() - lista todos os dados da tabela users
    //@Post() - criar um novo registro na tabela users
    //@Put(':id') - atualizar um determinado registro na tabela users (passando o id do registro)
}

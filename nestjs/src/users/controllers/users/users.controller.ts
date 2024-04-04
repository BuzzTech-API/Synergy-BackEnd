import { Body, Controller, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @Header ('Content-Type', 'application/json')
    async createUser(@Body() createUserDto:  CreateUserDto){
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return newUser
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    //rotas de usuarios aqui
    //Ex: @Get() - lista todos os dados da tabela users
    //@Post() - criar um novo registro na tabela users
    //@Put(':id') - atualizar um determinado registro na tabela users (passando o id do registro)
}

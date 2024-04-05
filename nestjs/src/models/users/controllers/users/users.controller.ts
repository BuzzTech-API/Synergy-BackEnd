import { Body, Controller, Get, Header, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/CreateUser.dto';
import { UsersService } from 'src/models/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    @Header('Content-Type', 'application/json')
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return newUser
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    @Get()
    async getUsers() {
        try {
            const users = await this.userService.getUsers()
            return users
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Get(':id') // pega o id da rota /users/{id}
    async getUserById(@Param('id', ParseIntPipe) id: number) { // usa os id da rota (ParseIntPipe): garante que o id é um numero
        try {
            const user = await this.userService.getUserById(id)
            return user
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    //rotas de usuarios aqui
    //Ex: @Get() - lista todos os dados da tabela users
    //@Post() - criar um novo registro na tabela users
    //@Put(':id') - atualizar um determinado registro na tabela users (passando o id do registro)
}

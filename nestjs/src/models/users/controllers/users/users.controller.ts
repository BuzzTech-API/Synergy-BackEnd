import { BadRequestException, Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/CreateUser.dto';
import { Public } from 'src/common/utils/constants';
import { UsersService } from 'src/models/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    @HttpCode(201)
    @Header('Content-Type', 'application/json')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.userService.createUser(createUserDto)
        return newUser
    }

    @Get()
    @HttpCode(200)
    async getUsers() {
        const users = await this.userService.getUsers()
        return users
    }

    @Get(':id') // pega o id da rota /users/{id}
    @HttpCode(200)
    async getUserById(@Param('id', ParseIntPipe) id: number) { // usa os id da rota (ParseIntPipe): garante que o id é um numero
        const user = await this.userService.getUserById(id)
        return user
    }

    @HttpCode(200)
    @Put(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.deleteUser(id)
        return user
    }

    //rotas de usuarios aqui
    //Ex: @Get() - lista todos os dados da tabela users
    //@Post() - criar um novo registro na tabela users
    //@Put(':id') - atualizar um determinado registro na tabela users (passando o id do registro)
}

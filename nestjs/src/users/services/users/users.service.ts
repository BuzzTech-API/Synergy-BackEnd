import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    // metodos aqui
    // Ex:  getUsers(): User[] { return this.users; }

    async createUser(userDetails: CreateUserParams) { //função para criar um usuario no banco de dados (cadastro)
        const existingUser = await this.userRepository.findOne({ where: { user_email: userDetails.user_email } });
        if (existingUser) {
            throw new Error('Email ja cadastrado'); //caso o email exista ele joga um erro com a mensagem. (precisa ter um catch na rota para a aplicação não cair)
        } else {
            return this.userRepository.save(this.userRepository.create(userDetails));
        }
    }

    async create_admin() {
        const existingUser = await this.userRepository.findOne({ where: { user_email: 'adm@adm' } })
        if (!existingUser) {
            const newAdmin: CreateUserParams = this.userRepository.create({
                user_name: "Admin",
                user_password: "Admin",
                user_email: "adm@adm",
                user_permission_level: 10,
                user_board: "Administrador",
            })
            return this.userRepository.save(newAdmin)
        }
        return console.log("Usuário administrador já existe!")
    }

}

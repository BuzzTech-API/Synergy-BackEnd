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
        throw new Error("Usuário já existe!")
    }

}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/utils/constants';
import { User } from 'src/common/utils/types';
import { UsersService } from 'src/models/users/services/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> { // método para validar o usuário com base no email e senha
        try {
            const user = await this.userService.getUserByEmail(email) // busca o usuário pelo email usando o serviço de usuário
            if (user.user_password === pass) {     // verifica se o usuário foi encontrado e se a senha corresponde à senha fornecida
                const { user_password, ...result } = user  // retorna as informações do usuário, excluindo a senha
                return result
            }
            // retorna null se o usuário não for encontrado ou se a senha estiver incorreta
            return null
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    async login(user: User) { // método para gerar um token de acesso após o login bem-sucedido
        const payload = { // cria um payload com as informações do usuário para serem incluídas no token
            user: {
                user_id: user.user_id,
                user_email: user.user_email,
                user_name: user.user_name,
                user_permission_level: user.user_permission_level,
            }
        }
        return {
            user: payload.user,
            backendTokens: {
                access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }), //assina o jwt com senhas diferentes para não ter o mesmo acesso
                refresh_token: this.jwtService.sign(payload, { expiresIn: '7d', secret: jwtConstants.refreshToken }),
                expiresIn: new Date().setTime(new Date().getTime() + 3599),
            }, // retorna o token de acesso assinado usando o serviço JWT
        }
    }

    async refreshToken(user: User) {
        const payload = { // cria um payload com as informações do usuário para serem incluídas no token
            user: {
                user_id: user.user_id,
                user_email: user.user_email,
                user_name: user.user_name,
                user_permission_level: user.user_permission_level,
            }
        }
        return {
            access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d', secret: jwtConstants.refreshToken }),
            expiresIn: new Date().setTime(new Date().getTime() + 3599),
        }
    }

    decodeToken(token): any { // método para decodificar um token JWT
        return this.jwtService.decode(token)
    }
}

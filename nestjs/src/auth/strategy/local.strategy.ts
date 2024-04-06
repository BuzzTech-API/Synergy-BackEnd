import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { Users } from 'src/entities/users.entity';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'user_email',
            passwordField: 'user_password',
        });
    }

    // método de validação da estratégia local
    async validate(user_email: string, user_password: string): Promise<Users> {
        const user = await this.authService.validateUser(user_email, user_password)    // chama o método de validação de usuário do serviço de autenticação
        if (!user) {   // se o usuário não for válido, lança uma exceção de não autorizado
            throw new UnauthorizedException('Credênciais invalidas')
        }
        return user // retorna o usuário válido
    }
}
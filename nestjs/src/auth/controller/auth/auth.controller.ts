import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard) // rota para efetuar login, protegida pelo LocalAuthGuard (verifica se o email e senha batem com o banco)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req)   // chama o método de login do serviço de autenticação e retorna o resultado
    }

    @UseGuards(JwtAuthGuard)  // rota para obter o perfil do usuário autenticado, protegida pelo JwtAuthGuard
    @Get('/profile')
    getProfile(@Request() req) {
      return req.user   // retorna as informações do usuário contidas no objeto de requisição
    }
}

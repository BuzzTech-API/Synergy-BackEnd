import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { RefreshJwtGuard } from 'src/auth/guard/refresh-jwt.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { Public } from 'src/common/utils/constants';
import { UsersService } from 'src/models/users/services/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
      private authService: AuthService,
      private usersService: UsersService
    ) { }

    @HttpCode(200)
    @Public()//Use para quando existir alguma rota que não precise de login ou caso queira testar a rota sem precisar do login
    @UseGuards(LocalAuthGuard) // rota para efetuar login, protegida pelo LocalAuthGuard (verifica se o email e senha batem com o banco)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)   // chama o método de login do serviço de autenticação e retorna o resultado
    }

    @HttpCode(200)
    @Get('/profile')
    getProfile(@Request() req) {
      return this.usersService.getUserById(req.user.user_id)   // retorna as informações do usuário contidas no objeto de requisição
    }

    @HttpCode(200)
    @Public()
    @UseGuards(RefreshJwtGuard)
    @Post('/refresh')
    async refreshToken(@Request() req){
      return this.authService.refreshToken(req.body)
    }
}

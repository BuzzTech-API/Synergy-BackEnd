import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth/auth.service';


@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(private authService: AuthService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> { 
        const req = context.switchToHttp().getRequest() // obtém o objeto de solicitação HTTP do contexto
        let tokenArray = req.headers.authorization
        // verifica se a rota da solicitação não é a rota de login e se há um token de autorização presente
        if (req.path !== '/auth/login' && tokenArray && req.path !== '/auth/refresh') {
            // decodifica o token de autorização para obter as informações do usuário e adiciona ao corpo da solicitação
            req["user"] = this.authService.decodeToken(tokenArray.split(" ")[1]).user
        }

        // chama o próximo manipulador de chamada na cadeia de execução e retorna o resultado
        return next
            .handle()
            .pipe(
        )
    }
}
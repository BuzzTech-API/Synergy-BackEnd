import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/common/utils/constants";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) { // método de validação do token JWT
        return { payload }   // retorna o payload do token como resultado da validação
    }
}
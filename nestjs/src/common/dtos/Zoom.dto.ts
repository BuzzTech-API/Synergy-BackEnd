import { IsNotEmpty, IsString } from "class-validator";

export class AuthorizationCode {
    @IsNotEmpty()
    @IsString()
    code: string
}
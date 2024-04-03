export class CreateUserDto { // Modelo para os dados que chegam das rotas
    user_name: string
    user_password: string
    user_email: string
    user_permission_level: number
    user_board: string
}
import { Meetings } from "src/entities/meetings.entity"

export class CreateUserParams { // Modelo de dados final que vai ser enviado para o banco de dados
    user_name: string
    user_password: string
    user_email: string
    user_permission_level: number
    user_board: string
}

export class CreateVirtualRoomParams {
    virtual_room_name: string
    virtual_room_link: string
    virtual_room_permission_level: number
}

export type CreateReservationsParams = {
    reserve_start: Date
    reserve_end: Date
    physical_room_id: number
}

export class CreatePhysicalroomParams {
    virtual_room_name: string
    physical_room_vacancies: number
    virtual_room_permission_level: number
}
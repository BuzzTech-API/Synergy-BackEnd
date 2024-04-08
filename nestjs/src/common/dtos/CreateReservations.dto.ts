import { Meetings } from "src/entities/meetings.entity";
import { User } from "src/entities/user.entity";

export class CreateReservationsDto {
    //reserve_date valor vai ser padrão (data de criação)

    reserve_start: Date;

    reserve_end: Date;

    //o usuário que a reserva está atrelada
    user_id: number

}
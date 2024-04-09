import { IsDateString, IsISO8601, IsNotEmpty, Min } from "class-validator";

export class CreateReservationsDto {
    @IsNotEmpty()
    @IsDateString()
    @IsISO8601()
    reserve_date: Date

    @IsNotEmpty()
    @IsDateString()//valida se é uma data
    @IsISO8601()//verifica se é uma data tipo ISO8601 Ex:YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS (com horas)
    reserve_start: Date;

    @IsNotEmpty()
    @IsDateString()
    @IsISO8601()
    reserve_end: Date;

    @IsNotEmpty()
    @Min(1)
    physical_room_id: number

}
import { IsDateString, IsISO8601, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateMeetingDto {

    @IsNotEmpty()
    @IsDateString()//valida se é uma data
    @IsISO8601()//verifica se é uma data tipo ISO8601 Ex:YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS (com horas)
    meeting_date: Date

    @IsNotEmpty()
    @IsDateString()
    @IsISO8601()
    meeting_time: Date

    @IsNotEmpty()
    @IsString()//verifica se é uma string
    meeting_title: string;

    @IsNotEmpty()
    @IsString()
    meeting_subject: string;

    @IsNotEmpty()
    @IsString()
    meeting_type: string

    @IsNotEmpty()
    @Min(1)
    reserve_id: number

}
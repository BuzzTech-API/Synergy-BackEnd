import { IsArray, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateParticipateDto {

    @IsNotEmpty()
    @Min(1)
    meeting_id: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    users_list: number[];

}
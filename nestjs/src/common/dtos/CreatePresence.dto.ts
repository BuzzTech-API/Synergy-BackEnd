import { IsArray, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreatePresenceDto {

    @IsNotEmpty()
    @Min(1)
    meeting_id: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    guests_list: number[];

}
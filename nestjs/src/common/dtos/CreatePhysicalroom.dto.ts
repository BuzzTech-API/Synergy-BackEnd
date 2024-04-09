import { IsNotEmpty, IsString, Max, MaxLength, Min } from "class-validator"
import { Users } from "src/entities/users.entity"

export class CreatePhysicalroomDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    physical_room_name: string

    @IsNotEmpty()
    @Min(1)
    physical_room_vacancies: number

    @IsNotEmpty()
    @Min(1)
    @Max(3)
    virtual_room_permission_level: number
}
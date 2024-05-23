import { IsNotEmpty, IsString, Max, MaxLength, Min } from "class-validator"

export class UpdateVirtualRoomDto{
    @IsNotEmpty()
    @Min(1)
    virtual_room_id: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    virtual_room_name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(254)
    virtual_room_link: string

    @IsNotEmpty()
    @Min(1)
    @Max(3)
    virtual_room_permission_level: number
}
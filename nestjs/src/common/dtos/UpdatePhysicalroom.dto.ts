import { IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdatePhysicalroomDto {
  @IsNotEmpty()
  @Min(1)
  physical_room_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  physical_room_name: string;

  @IsNotEmpty()
  @Min(1)
  physical_room_vacancies: number;

  @IsString()
  @IsNotEmpty()
  physical_room_address: string;

  @IsNotEmpty()
  @Min(1)
  @Max(3)
  physical_room_permission_level: number;
}


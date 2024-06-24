import {
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty()
  @IsString() //verifica se é uma string
  meeting_title: string;

  @IsNotEmpty()
  @IsString()
  meeting_subject: string;

  @IsNotEmpty()
  @IsString()
  meeting_type: string;

  @IsNotEmpty()
  @Min(1)
  reserve_id: number;
}

import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthorizationCode {
    @IsNotEmpty()
    @IsString()
    code: string;
}

export class zoomMeetinhCreateDto {
    @IsNotEmpty()
    @IsString()
    access_token: string;

    @IsNotEmpty()
    @IsString()
    refresh_token: string;

    @IsNotEmpty()
    @IsString()
    topic: string;

    @IsNotEmpty()
    @IsString()
    start_time: string;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsString()
    agenda: string;

    @IsNotEmpty()
    @IsArray()
    meeting_invites: string[];
}

// create-user-details.dto.ts
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDetailsDataDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    resumeid: string;

    @IsEmail()
    useremail: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    themeColor: string;
}

export class CreateResumeDto {
    data: UserDetailsDataDto;
}

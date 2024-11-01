// update-user-details.dto.ts
import { IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDetailsDto {

    @IsOptional()
    title?: string;

    @IsOptional()
    resumeid?: string;

    @IsOptional()
    @IsEmail()
    userEmail?: string;

    @IsOptional()
    username?: string;

    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    jobTitle?: string;

    @IsOptional()
    number?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    summary?: string;
}

export class UpdateUserDTO {
    data: UpdateUserDetailsDto;
}


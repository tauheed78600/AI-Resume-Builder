import { IsOptional, IsEmail, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class LinkDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    link?: string;
}

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LinkDto)
    @IsOptional()
    links?: LinkDto[];
}

export class UpdateUserDTO {
    data: UpdateUserDetailsDto;
}

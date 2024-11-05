import { IsOptional, IsObject, IsString, IsDateString, IsNumber } from 'class-validator';


export class SendDTO {
    @IsOptional()
    @IsNumber()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    message?: string;
}
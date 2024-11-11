import { IsOptional, IsObject, IsArray } from 'class-validator';

export class ProjectDTO {

    @IsOptional()
    id?: number

    @IsOptional()
    projectTitle?: string;

    @IsOptional()
    startDate?: Date;

    @IsOptional()
    endDate?: Date;

    @IsOptional()
    projectDescription?: string;

    @IsOptional()
    major?: string;
}
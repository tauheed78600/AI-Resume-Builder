import { IsOptional, IsObject } from 'class-validator';


export class UpdateSkillDTO {

    @IsOptional()
    id?: number;

    @IsOptional()
    skill?: string;

    @IsOptional()
    rating?: number;

    @IsOptional()
    major?: string;
}

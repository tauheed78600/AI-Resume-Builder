import { IsOptional, IsObject, IsArray } from 'class-validator';

export class UpdateExperienceDTO {

    @IsOptional()
    id?: number

    @IsOptional()
    title?: string;

    @IsOptional()
    city?: string;

    @IsOptional()
    state?: string;

    @IsOptional()
    startDate?: Date;

    @IsOptional()
    endDate?: Date;

    @IsOptional()
    companyName?: string;

    @IsOptional()
    summary?: string;

    @IsOptional()
    major?: string;
}

// Create a new class for the experiences array
// export class UpdateExperiencesDTO {
//     @IsArray()
//     experiences: UpdateExperienceDTO[];
// }
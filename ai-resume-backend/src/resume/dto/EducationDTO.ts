import { IsOptional, IsObject, IsString, IsDateString, IsNumber } from 'class-validator';

export class UserResumeDTO {
    @IsOptional()
    @IsString()
    resumeid?: string;
}

export class UpdateEducationDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    degree?: string;

    @IsOptional()
    @IsString()
    branch?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    universityName?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    major?: string;

    @IsOptional()
    @IsNumber()
    cgpa?: number; // Changed to IsNumber for CGPA since it's numeric

    @IsOptional()
    @IsObject()
    user_resume?: UserResumeDTO; // User resume information
}

export class UpdateEducation {
    @IsObject()
    data: UpdateEducationDTO[]; // List of education entries
}

export class UpdatedEducationDTO {
    @IsObject()
    educationList: UpdateEducationDTO[];

    @IsOptional()
    @IsString()
    resumeId?: string;
}

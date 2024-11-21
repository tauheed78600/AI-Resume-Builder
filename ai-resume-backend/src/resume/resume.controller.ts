import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { JwtService } from '@nestjs/jwt';
import { CreateResumeDto } from './dto/CreateResumeDTO';
import { UpdateUserDetailsDto } from './dto/UpdateUserDTO';
import { UpdateExperienceDTO } from './dto/UpdateExperienceDTO';
import { UpdateSkillDTO } from './dto/SkillDto';
import { UpdateEducationDTO } from './dto/EducationDTO';
import { SendDTO } from './dto/SendDTO';
import { send } from 'process';
import { ProjectDTO } from './dto/ProjectDTO';

@Controller('/api')
export class ResumeController {

    constructor(private readonly resumeService: ResumeService, private readonly jwtService: JwtService,){
    }

    @Post('/user-resumes')
    async create(@Body() createUserDetailsDto: CreateResumeDto) {

        console.log("data in line 14", createUserDetailsDto)
        return this.resumeService.createResume(createUserDetailsDto);
    }


    
    @Get('/user-resumes/:userEmail')
    async getResume(@Param('userEmail') userEmail: string) {
        console.log('userEmail in getResume:', userEmail);
        const resumes = this.resumeService.getResumes(userEmail)
        return resumes
    }

    @Get('/resume/data/:userid')
    async getResumeData(@Param('userid') userid: string){
        console.log("inside getResume data function")
        const res = this.resumeService.getResumeData(userid)
        return res
    }


    @Post('/send-message')
    async sendMessage(@Body() sendDTO: SendDTO){
        console.log("data in sendDto", sendDTO)
        this.resumeService.sendMail(sendDTO)
    }
    
    @Post('/add-projects/:userid')
    async addProject(@Body() projectDto: ProjectDTO[], @Param('userid') userId: number){
        console.log("inside projects API", userId, projectDto)
        this.resumeService.addProjects(userId, projectDto)
    }


    @Put('/user-resumes/:resumeid')
    async update(@Param('resumeid') resumeId: string, @Body() updateUserDetailsDto: UpdateUserDetailsDto) {
        console.log("inside")
        console.log("line 50, put api", resumeId, updateUserDetailsDto)
        console.log("links line 58", updateUserDetailsDto)

        this.resumeService.updateUserDetails(resumeId, updateUserDetailsDto);
    }

    @Post('/experiences/:userid')
    async addExperience(@Body() body: { experiences: UpdateExperienceDTO[] }, @Param('userid') userId: number) {
        console.log("inside experiences", body.experiences);
        // Pass the experiences array to the service method
        await this.resumeService.updateExperiences(userId, body.experiences);
    }


    @Post('/skills/:userid')
    async addSkill(@Body() skillDto: UpdateSkillDTO[], @Param('userid') userId: number){
        console.log("data in skills API", skillDto)
        this.resumeService.addSkill(userId, skillDto)
    }

    @Delete('/delete-resume/:id')
    async deleteResume(@Param('id') id: number){
        console.log("inside delete resume")
        this.resumeService.deleteResume(id)
    }

    @Put('/education/:userid')
    async addEducation(@Body() addEdu: UpdateEducationDTO[], @Param('userid') userId: number){
        console.log("inside education123", addEdu)
        this.resumeService.addEducation(userId, addEdu)
    }

}

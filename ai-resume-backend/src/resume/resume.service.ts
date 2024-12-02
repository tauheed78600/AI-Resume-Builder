import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from 'src/entity/UserDetails';
import { In, Not, Repository } from 'typeorm';
import { CreateResumeDto } from './dto/CreateResumeDTO';
import { UpdateUserDetailsDto } from './dto/UpdateUserDTO';
import { UpdateExperienceDTO } from './dto/UpdateExperienceDTO';
import { Experience } from 'src/entity/Experience';
import { Education } from 'src/entity/Education';
import { Skills } from 'src/entity/Skills';
import { UpdateSkillDTO } from './dto/SkillDto';
import { UpdateEducationDTO } from './dto/EducationDTO';
import { SendDTO } from './dto/SendDTO';
import { MailerService } from '@nestjs-modules/mailer';
import { template } from '@babel/core';
import { Projects } from 'src/entity/Projects';
import { ProjectDTO } from './dto/ProjectDTO';
import { Links } from 'src/entity/Links';
import { exec } from 'child_process';
const ResumeParser = require('simple-resume-parser');
const fs = require('fs');
const path = require('path');

@Injectable()
export class ResumeService {

    constructor(
        @InjectRepository(UserDetails)
        private UserDetRepo: Repository<UserDetails>,
        @InjectRepository(Experience)
        private ExpRepo: Repository<Experience>,
        @InjectRepository(Education)
        private EduRepo: Repository<Education>,
        @InjectRepository(Skills)
        private skillRepo: Repository<Skills>,
        @InjectRepository(Projects)
        private projectsRepo: Repository<Projects>,
        @InjectRepository(Links)
        private linksRepo:  Repository<Links>,
        private readonly mailerService: MailerService
    ) { }

    async createResume(dto: CreateResumeDto): Promise<UserDetails> {

        const { title, resumeid, useremail, username, themeColor, templateId } = dto.data;

        const userDetails = new UserDetails();
        console.log("dto in service line 18", dto)
        userDetails.resumeid = resumeid
        userDetails.title = title;
        userDetails.userEmail = useremail;
        userDetails.username = username;
        userDetails.themeColor = themeColor
        userDetails.templateId = templateId

        console.log("usedetails line 23", userDetails)

        await this.UserDetRepo.save(userDetails);
        const user2 = await this.UserDetRepo.findOne({ where: { resumeid: resumeid } })
        console.log("user after fetched", user2)
        return user2
    }

    async sendMail(sendDTO: SendDTO) {
        const { name, email, message } = sendDTO;
        const subject = "Mail from your website";

        try {
            await this.mailerService.sendMail({
                to: 'tauheeddarekar786@gmail.com',
                subject: subject,
                template: './welcome',
                context: {
                    name: name,
                    message: message,
                },
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }


    async updateUserDetails(userid: string, dto: UpdateUserDetailsDto): Promise<UserDetails> {
        console.log("id in service", userid)
        const id = parseInt(userid)
        const user = await this.UserDetRepo.findOne({ where: { userid: id } });
        if (!user) {
            throw new Error('User not found');
        }
        console.log("id after int", id)
        const userDetails = await this.UserDetRepo.findOne({ where: { userid: id } });

        if (!userDetails) {
            throw new NotFoundException(`UserDetails with resumeId ${id} not found`);
        }

        const userIds = user.userid
        await this.linksRepo.createQueryBuilder()
            .delete()
            .from(Links)
            .where("user_id = :userIds", { userIds })
            .execute();

        if(dto.links){
            const linkEntities = dto.links.map(lin=>{
            const links =  this.linksRepo.create({
                ...lin,
                name: lin.name,
                link: lin.link
            });
            links.user = user
            return links
        })

        await this.linksRepo.save(linkEntities);
    }

        const { firstName, lastName, address, number, email, jobTitle, summary } = dto

        userDetails.firstName = firstName
        userDetails.lastName = lastName
        userDetails.email = email
        userDetails.address = address
        userDetails.jobTitle = jobTitle
        userDetails.number = number
        userDetails.summary = summary

        return this.UserDetRepo.save(userDetails);
    }


    async analyzeResume(filePath: string): Promise<any> {
        if (!filePath) {
            throw new Error("File path is missing or invalid");
        }
    
        return new Promise((resolve, reject) => {
            console.log("Parsing resume at:", filePath);
    
            const resume = new ResumeParser(filePath);
    
            resume.parseToJSON()
                .then((data) => {
                    console.log('Parsed data:', data);
                    resolve(data);
                })
                .catch((error) => {
                    console.error('Error parsing to JSON:', error.message);
                    reject(error);
                });
    
            resume.parseToFile('converted')
                .then((file) => {
                    console.log('Parsed file saved at:', file);
                    resolve(file);
                })
                .catch((error) => {
                    console.error('Error parsing to file:', error.message);
                    reject(error);
                });
        });
    }


    // async analyzeResume(filePath: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const pythonScript = './src/python.py';
    //         const jobDescription = `Analyze, design, develop, troubleshoot, and debug software programs for commercial or end-user applications. Writes code, completes programming, and performs testing and debugging of applications. Career Level - IC3
    
    //         As a member of the Oracle Sales and CPQ development team, you will work on developing complex backend services for Sales/CPQ applications on the Oracle Fusion stack. Once provided with the requirements, you will be expected to come up with a high-level design, solution proposal, get sign-off on the solution from the stakeholder, do detailed design, code, build the solution, build and implement unit tests and unit plans, and deploy the solution to production for highly complex enhancements and bugs. You are also expected to work on customer bugs and enhancements.
    
    //         **Requirements:**
    
    //         * BS/MS in Computer Science or equivalent
    //         * 6-10 years of experience in developing and maintaining business applications
    //         * Excellent analytical and interpersonal skills
    //         * Self-motivated with a strong ability to learn quickly and work independently
    
    //         **Technical Skills:**
    
    //         * Core Java programming experience
    //         * Enterprise Java or Java web frameworks like Spring
    //         * SQL programming
    //         * ELK stack knowledge and experience in leveraging it to build out search functionality for a web application (a plus)
    //         * Prior experience on developing scalable SaaS products (a plus)
    //         * Knowledge of Oracle Technologies (a plus)
    //         * Knowledge of Source Control Systems (GIT repository)`;
    
    //         const jobDescFilePath = path.join(__dirname, 'temp_job_description.txt');
    //         fs.writeFileSync(jobDescFilePath, jobDescription);
    
    //         const jdFilePath = './src/resume/temp_job_description.txt'

    //         const command = `python ${pythonScript} "${jdFilePath}" "${filePath}"`;
    
    //         console.log("Executing command:", command);
    
    //         exec(command, (error, stdout, stderr) => {
    //             if (error) {
    //                 console.error("Error executing Python script:", error.message);
    //                 reject(new Error(`Python script error: ${stderr || error.message}`));
    //                 return;
    //             }
    
    //             console.log("Python script output:", stdout);
    
    //             try {
    //                 const parsedOutput = JSON.parse(stdout);
    //                 console.log("Parsed output:", parsedOutput);
    //                 resolve(parsedOutput);
    //             } catch (parseError) {
    //                 console.error("Error parsing Python script output:", parseError.message);
    //                 reject(new Error('Error parsing Python script output'));
    //             }
    //         });
    //     });
    // }
    
      

    async getResumeData(id: string) {
        const userid = parseInt(id);

        const user = await this.UserDetRepo.findOne({ where: { userid: userid } });
        if (!user) {
            throw new Error('User not found');
        }

        // Fetch education and experience records based on the user
        const education = await this.EduRepo.find({
            where: { user: { userid: userid } },
            relations: ['user']
        });

        const experience = await this.ExpRepo.find({
            where: { user: { userid: userid } },
            relations: ['user']
        });
        console.log("userid line 125", userid)

        const skills = await this.skillRepo.find({
            where: { user: { userid: userid } },
            relations: ['user']
        });

        const projects = await this.projectsRepo.find({
            where: { user: { userid: userid } },
            relations: ['user']
        });

        const links = await this.linksRepo.find({
            where: {user: {userid: userid}},
            relations: ['user']
        })

        // Logging user information
        // console.log("user before projects", projects);

        const { title, themeColor, firstName, lastName, jobTitle, userEmail, username, number, summary, address, email, templateId } = user;

        const response = {
            title,
            firstName,
            lastName,
            jobTitle,
            userEmail,
            username,
            templateId,
            number,
            summary,
            address,
            email,
            themeColor,
            education,
            experience,
            projects,
            skills,
            links
        };
        return response;
    }

    async addProjects(userid: number, data: ProjectDTO[]) {
        const user = await this.UserDetRepo.findOne({ where: { userid: userid } });
        if (!user) {
            throw new Error('User not found');
        }
        const userIds = user.userid
        await this.projectsRepo.createQueryBuilder()
            .delete()
            .from(Projects)
            .where("user_id = :userIds", { userIds })
            .execute();

        if (data.length === 0) {
            return
        }
        if (data.length && data.length > 0) {
            const projectEntities = data.map(entry => {
                const projects = this.projectsRepo.create({
                    ...entry,
                    projectTitle: entry.projectTitle,
                    projectDescription: entry.projectDescription,
                    startDate: entry.startDate,
                    endDate: entry.endDate,
                    major: entry.major
                });
                projects.user = user;
                return projects;
            });

            await this.projectsRepo.save(projectEntities);
        }
    }


    async deleteResume(id: number) {
        const user = await this.UserDetRepo.findOne({ where: { userid: id } })
        await this.EduRepo.delete({ user: user })
        await this.ExpRepo.delete({ user: user })
        await this.skillRepo.delete({ user: user })
        await this.UserDetRepo.delete(id)
        return
    }


    async addSkill(userId: number, addEdu: UpdateSkillDTO[]) {
        const user = await this.UserDetRepo.findOne({ where: { userid: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const userid = user.userid
        await this.EduRepo.createQueryBuilder()
            .delete()
            .from(Skills)
            .where("user_id = :userid", { userid })
            .execute();

        console.log("after delete")
        if (addEdu.length === 0) {
            return
        }

        if (addEdu && addEdu.length > 0) {
            const educationEntities = addEdu.map(entry => {
                const education = this.skillRepo.create({
                    ...entry,
                    major: entry.major,
                    rating: entry.rating,
                    skill: entry.skill
                });
                education.user = user;
                return education;
            });

            // Save the new education entries
            await this.skillRepo.save(educationEntities);
        }


    }

    async addEducation(resumeId: number, educationEntries: UpdateEducationDTO[]): Promise<void> {
        const user = await this.UserDetRepo.findOne({ where: { userid: resumeId } });

        if (!user) {
            throw new Error('User not found');
        }


        const userId = user.userid;


        await this.EduRepo.createQueryBuilder()
            .delete()
            .from(Education)
            .where("user_id = :userId", { userId })
            .execute();

        console.log("after delete")

        if (educationEntries.length === 0) {
            return
        }

        if (educationEntries && educationEntries.length > 0) {
            const educationEntities = educationEntries.map(entry => {
                const education = this.EduRepo.create({
                    ...entry,
                    startDate: entry.startDate ? entry.startDate.split('T')[0] : null,
                    endDate: entry.endDate ? entry.endDate.split('T')[0] : null,
                });
                education.user = user;
                return education;
            });

            await this.EduRepo.save(educationEntities);
        }
    }

    async updateExperiences(userid: number, updateExp: UpdateExperienceDTO[]) {
        console.log("line 67 updateExp", updateExp)
        const user = await this.UserDetRepo.findOne({ where: { userid: userid } })
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user.userid;


        await this.ExpRepo.createQueryBuilder()
            .delete()
            .from(Experience)
            .where("user_id = :userId", { userId })
            .execute();

        console.log("after delete")

        if (updateExp.length === 0) {
            return
        }
        if (updateExp && updateExp.length > 0) {
            const educationEntities = updateExp.map(entry => {
                const education = this.ExpRepo.create({
                    ...entry,
                    startDate: entry.startDate,
                    endDate: entry.endDate,
                });
                education.user = user;
                return education;
            });

            await this.ExpRepo.save(educationEntities);
        }
    }

    async getResumes(userEmail: string) {
        const resumes = await this.UserDetRepo.find({ where: { userEmail: userEmail } })
        console.log("resumes in line 142", resumes)
        return resumes
    }


}

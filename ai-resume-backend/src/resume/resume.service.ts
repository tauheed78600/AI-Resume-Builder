import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from 'src/entity/UserDetails';
import { Not, Repository } from 'typeorm';
import { CreateResumeDto } from './dto/CreateResumeDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { UpdateExperienceDTO } from './dto/UpdateExperienceDTO';
import { Experience } from 'src/entity/Experience';
import { Education } from 'src/entity/Education';
import { Skills } from 'src/entity/Skills';
import { UpdateSkillDTO } from './dto/SkillDto';
import { UpdateEducationDTO } from './dto/EducationDTO';
import { SendDTO } from './dto/SendDTO';
import { MailerService } from '@nestjs-modules/mailer';

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
        private readonly mailerService: MailerService
    ) {}

    async createResume(dto: CreateResumeDto): Promise<UserDetails>{

        const { title, resumeid, useremail, username, themeColor } = dto.data;

        const userDetails = new UserDetails();
        console.log("dto in service line 18", dto)
        userDetails.resumeid = resumeid
        userDetails.title = title;
        userDetails.userEmail = useremail;
        userDetails.username = username;
        userDetails.themeColor = themeColor

        console.log("usedetails line 23", userDetails)

        return this.UserDetRepo.save(userDetails);
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
    

    async updateUserDetails(userid: string, dto: UpdateUserDTO): Promise<UserDetails> {

        const id = parseInt(userid)
        const userDetails = await this.UserDetRepo.findOne({ where: { userid: id } });

        if (!userDetails) {
            throw new NotFoundException(`UserDetails with resumeId ${id} not found`);
        }

        const {firstName, lastName, address, number, email, jobTitle, summary} = dto.data

        userDetails.firstName = firstName
        userDetails.lastName = lastName
        userDetails.email = email
        userDetails.address = address
        userDetails.jobTitle = jobTitle
        userDetails.number = number
        userDetails.summary = summary
        
        return this.UserDetRepo.save(userDetails);
    }

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

    // Logging user information
    console.log("user before res", skills);

    const {title, themeColor, firstName, lastName, jobTitle, userEmail, username, number, summary, address, email} = user;

    const response = {
        title,
        firstName,
        lastName,
        jobTitle,
        userEmail,
        username,
        number,
        summary,
        address,
        email,
        themeColor,
        education,
        experience,
        skills
    };
    return response;
}


async deleteResume(id: number){
    const user = await this.UserDetRepo.findOne({where: {userid: id}})
    await this.EduRepo.delete({user: user})
    await this.ExpRepo.delete({user: user})
    await this.skillRepo.delete({user: user})
    await this.UserDetRepo.delete(id)
    return
}


async addSkill(userId: number, addEdu: UpdateSkillDTO[]){
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
    if (addEdu.length === 0){
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

    if (educationEntries.length === 0){
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

        // Save the new education entries
        await this.EduRepo.save(educationEntities);
    }
}

async updateExperiences(userid: number, updateExp: UpdateExperienceDTO[]) {
    console.log("line 67 updateExp", updateExp)
    const user = await this.UserDetRepo.findOne({where: {userid: userid}})
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

    if (updateExp.length === 0){
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

        // Save the new education entries
        await this.ExpRepo.save(educationEntities);
    }
}







    async getResumes(userEmail: string){
        const resumes = await this.UserDetRepo.find({where: {userEmail: userEmail}})
        console.log("resumes in line 142", resumes)
        return resumes
    }


}

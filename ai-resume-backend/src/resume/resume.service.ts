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
        private skillRepo: Repository<Skills>
    ) {}

    async createResume(dto: CreateResumeDto): Promise<UserDetails>{

        const { title, resumeid, useremail, username } = dto.data;

        const userDetails = new UserDetails();
        console.log("dto in service line 18", dto)
        userDetails.resumeid = resumeid
        userDetails.title = title;
        userDetails.userEmail = useremail;
        userDetails.username = username;

        console.log("usedetails line 23", userDetails)

        return this.UserDetRepo.save(userDetails);
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

    const {themeColor, firstName, lastName, jobTitle, userEmail, username, number, summary, address, email} = user;

    const response = {
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
    if (updateExp.length === 0){
        const idsToDelete = await this.ExpRepo.find({where: {user: user}})
        console.log("idsToDelete line 71", idsToDelete)
        if (idsToDelete.length === 0){
            return
        }
        let ids = []
        idsToDelete.map((exp)=>ids.push(exp.id))
        await this.ExpRepo.delete(ids)
        return
    }
    let idsToDelete = []
    updateExp.map((edu)=>idsToDelete.push(edu.id))
    console.log("idsToDelete in education", idsToDelete)
    await this.ExpRepo.delete(idsToDelete)

    updateExp.map((newExpEntry)=>{
        let experienceSave = new Experience()
        experienceSave.city = newExpEntry.city
        experienceSave.companyName = newExpEntry.companyName
        experienceSave.endDate = newExpEntry.endDate
        experienceSave.major = newExpEntry.major
        experienceSave.startDate = newExpEntry.startDate
        experienceSave.state = newExpEntry.city
        experienceSave.summary = newExpEntry.summary
        experienceSave.title = newExpEntry.title
        experienceSave.user = user

        this.ExpRepo.save(experienceSave)
    })
}







    async getResumes(userEmail: string){
        const resumes = await this.UserDetRepo.find({where: {userEmail: userEmail}})
        console.log("resumes in line 142", resumes)
        return resumes
    }


}

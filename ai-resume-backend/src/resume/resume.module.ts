import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from 'src/entity/UserDetails';
import { Experience } from 'src/entity/Experience';
import { Education } from 'src/entity/Education';
import { Skills } from 'src/entity/Skills';
import { Projects } from 'src/entity/Projects';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetails, Experience, Education, Skills, Projects]),],
  controllers: [ResumeController],
  providers: [ResumeService, JwtService]
})
export class ResumeModule {}
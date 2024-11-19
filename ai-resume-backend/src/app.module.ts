import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { JwtModule, JwtService } from '@nestjs/jwt'; 
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { Experience } from './entity/Experience';
import { UserDetails } from './entity/UserDetails';
import { Education } from './entity/Education';
import { Skills } from './entity/Skills';
import { Projects } from './entity/Projects';
import { Links } from './entity/Links';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'tauheeddarekar786@gmail.com',
          pass: 'vzrsjndnlqbrrqdh',
        },
      },
      defaults: {
        from: '"No Reply" <tauheeddarekar786@gmail.com>',
      },
      template: {
        dir: join(__dirname, '../src/templates'),
        adapter: new HandlebarsAdapter(), // or any other adapter
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'airesume',
      entities: [Experience, UserDetails, Education, Skills, Projects, Links],
      synchronize: true,
    }),   
    ResumeModule,
    JwtModule.register({
      secret: '5f83805a-01eb-47cd-b327-6697be859a88',
      signOptions: {expiresIn: '24h'}
    }),],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}

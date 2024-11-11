import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserDetails } from './UserDetails';

@Entity('projects')
export class Projects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    projectTitle: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({type: 'text', nullable: true})
    projectDescription: string;

    @Column({type: 'text'})
    major: string

    // Fix the foreign key relationship
    @ManyToOne(() => UserDetails, user => user.userid)
    @JoinColumn({ name: 'user_id' })
    user: UserDetails;
}

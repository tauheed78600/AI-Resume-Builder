import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserDetails } from './UserDetails';

@Entity('education')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    degree: string;

    @Column({ type: 'text' })
    branch: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    universityName: string;

    @Column({type: 'text'})
    major: string

    @Column({ type: 'text' })
    cgpa: number;

    // Fix the foreign key relationship
    @ManyToOne(() => UserDetails, user => user.userid)
    @JoinColumn({ name: 'user_id' })
    user: UserDetails;
}

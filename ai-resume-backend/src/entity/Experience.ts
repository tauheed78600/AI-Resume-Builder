import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserDetails } from './UserDetails';

@Entity('experience')
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    city: string;

    @Column({ type: 'text' })
    state: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ type: 'text' })
    summary: string;

    @Column({ type: 'text' })
    companyName: string;

    @Column({ type: 'text' })
    major: string;

    // Fix the foreign key relationship
    @ManyToOne(() => UserDetails, user => user.userid)
    @JoinColumn({ name: 'user_id' })
    user: UserDetails;
}

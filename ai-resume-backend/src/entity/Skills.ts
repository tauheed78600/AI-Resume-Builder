import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserDetails } from './UserDetails';

@Entity('skills')
export class Skills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    skill: string;

    @Column({ type: 'text' })
    rating: number;

    @Column({ type: 'text' })
    major: string;

    // Fix the foreign key relationship
    @ManyToOne(() => UserDetails, user => user.userid)
    @JoinColumn({ name: 'user_id' })
    user: UserDetails;
}

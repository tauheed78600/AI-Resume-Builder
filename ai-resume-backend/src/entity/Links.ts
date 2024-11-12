import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserDetails } from './UserDetails';

@Entity('links')
export class Links {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    link: string;

    @ManyToOne(() => UserDetails, user => user.userid)
    @JoinColumn({ name: 'user_id' })
    user: UserDetails;
}

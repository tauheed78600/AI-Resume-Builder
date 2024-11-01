import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_details')
export class UserDetails {
    
    @PrimaryGeneratedColumn()
    userid: number;

    @Column({ type: 'text', nullable: true, default: null })
    title: string;

    @Column({ type: 'text', nullable: true, default: null })
    resumeid: string;

    @Column({ type: 'varchar', nullable: true, default: null })
    userEmail: string;

    @Column({ type: 'text', nullable: true, default: null })
    username: string;

    @Column({ type: 'text', nullable: true, default: null })
    firstName: string;

    @Column({ type: 'text', nullable: true, default: null })
    lastName: string;

    @Column({ type: 'text', nullable: true, default: null })
    address: string;

    @Column({ type: 'text', nullable: true, default: null })
    jobTitle: string;

    @Column({ type: 'text', nullable: true, default: null })
    number: string;

    @Column({ type: 'text', nullable: true, default: null })
    email: string;

    @Column({ type: 'text', nullable: true, default: null })
    summary: string;

    @Column({ type: 'text', nullable: true, default: null })
    themeColor: string;
}

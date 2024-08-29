/* eslint-disable prettier/prettier */

import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity(({ name: 'User' }))
export class UserEntity {
    @PrimaryGeneratedColumn()
    User_ID: number;

    @Column()
    Name: string;

    @Column({ unique: true })
    Email: string;

    @Column()
    Password: string;

}

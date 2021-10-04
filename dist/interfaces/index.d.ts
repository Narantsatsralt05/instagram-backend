import { Date } from 'mongoose';
export interface IUser {
    username: string;
    fullName: string;
    password: string;
    email: string;
    lastLogin?: Date;
}

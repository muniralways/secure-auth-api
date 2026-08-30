import {Types} from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;

}

export type CreateUserDto = Pick<IUser, 'name' | 'email' | 'password'>
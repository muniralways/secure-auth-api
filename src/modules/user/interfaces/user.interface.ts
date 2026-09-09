import { Types , Document} from "mongoose";

export interface IUser extends  Document{
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    //instance methods

    comparePassword(candidatePassword: string): Promise<boolean>;

}



export type CreateUserDto = Pick<IUser, 'name' | 'email' | 'password'>
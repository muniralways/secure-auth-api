import type {IUser} from "@modules/user/interfaces/user.interface.js";
import { model, Schema} from "mongoose";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim : true,
    },
    email : {
        type: String,
        unique : true,
        trim: true,

    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true, versionKey: false });

export const User = model<IUser>('User', userSchema)
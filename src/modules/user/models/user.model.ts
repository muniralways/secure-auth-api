import type { IUser } from "@modules/user/interfaces/user.interface.js";
import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import {logger} from "@shared/logger/logger.js";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
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

const SALT_ROUNDS = 12;

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return ;
    }

    try {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

    } catch (error) {
 logger.error(error);
     throw  error;
    }
});


userSchema.methods.comparePassword = async  function (this: IUser, candidatePassword: string): Promise<boolean> {
    return  bcrypt.compare(candidatePassword, this.password)
}

export const User = model<IUser>('User', userSchema);
import type {CreateUserDto, IUser} from "@modules/user/interfaces/user.interface.js";
import {User} from "@modules/user/models/user.model.js";
import {logger} from "@shared/logger/logger.js";
import {Types} from "mongoose";

export class UserRepository {
    async  create(data:CreateUserDto) {
        return User.create(data);
    }

    async findByEmail (email: string) {
        return User.findOne({email}).select('-password');

    }
    async findById(id: string){

        if(!Types.ObjectId.isValid(id)) {
            logger.info("Invalid MongoDB ID");
        }
        return User.findById(id)
    }

    async exists(email: string) {
        return User.exists({email});
    }
}
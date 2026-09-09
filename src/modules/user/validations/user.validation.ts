import {z} from "zod";


const registerSchema = z.object({
    body:z.object({
        name: z.string()
            .trim()
            .min(2,"Name must be at least 2 characters")
            .max(20, "Name must be at least 20 characters"),



   email: z.string().trim().email("Invalid email address")
       .toLowerCase(),


        password: z.string().trim().min(6, "Password must be at least 6 characters")
            .max(100, "Password must be at least 100 characters"),

        role:z.enum(["administrator","admin", "student"]).optional(),




    })




})


export const AuthValidation = {registerSchema}
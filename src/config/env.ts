import {z} from "zod";
import "dotenv/config";


const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),

    PORT: z.coerce.number().default(5000),

    MONGO_URI: z.string().min(1),

    JWT_ACCESS_SECRET: z.string().min(32),

    JWT_REFRESH_SECRET: z.string().min(32),

    ACCESS_TOKEN_EXPIRES: z.string(),

    REFRESH_TOKEN_EXPIRES: z.string(),
});

export const env = envSchema.parse(process.env);
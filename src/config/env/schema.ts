import { z } from "zod";
import { integerFromEnv } from "@config/env/primitives.js";

const portBounds = {
    min: 1,
    max: 65_535,
} as const;

export const envSchema = z.object({
    // Application
    NODE_ENV: z
        .enum(["development", "production"])
        .default("development"),

    PORT: integerFromEnv(5000, portBounds),

    // Logging
    LOG_LEVEL: z
        .enum(["fatal", "error", "warn", "info", "debug", "trace"])
        .default("info"),

    // Database
    MONGODB_URI: z
        .string()
        .trim()
        .min(1, {
            message: "MongoDB URI is required",
        })
        .startsWith("mongodb", {
            message: "MongoDB URI must start with mongodb",
        }),

    // JWT
    JWT_ACCESS_SECRET: z
        .string()
        .trim()
        .min(32, {
            message: "JWT access secret must be at least 32 characters",
        }),

    JWT_REFRESH_SECRET: z
        .string()
        .trim()
        .min(32, {
            message: "JWT refresh secret must be at least 32 characters",
        }),

    ACCESS_TOKEN_EXPIRES: z
        .string()
        .trim()
        .min(1, {
            message: "Access token expiration is required",
        }),

    REFRESH_TOKEN_EXPIRES: z
        .string()
        .trim()
        .min(1, {
            message: "Refresh token expiration is required",
        }),

    // Cookie
    COOKIE_DOMAIN: z
        .string()
        .trim()
        .optional(),

    COOKIE_SECURE: z
        .enum(["true", "false"])
        .default("false")
        .transform((value) => value === "true"),

    COOKIE_SAME_SITE: z
        .enum(["strict", "lax", "none"])
        .default("lax"),

    // Frontend
    CLIENT_URL: z
        .string()
        .trim()
        .url()
        .optional(),
});
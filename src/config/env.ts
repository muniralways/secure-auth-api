import {z} from "zod";
import {envSchema} from "@config/env/schema.js";

const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
    console.dir(z.treeifyError(parsed.error), { depth: null });
    process.exit(1);
}
const data = parsed.data

type parsedEnv = z.infer<typeof  envSchema>
export type Env = Readonly<parsedEnv & {
    readonly isDevelopment: boolean
    readonly isProduction: boolean
}>

export const env: Env = Object.freeze({
    ...data,
    isDevelopment: data.NODE_ENV === 'development',
    isProduction: data.NODE_ENV === 'production'
})
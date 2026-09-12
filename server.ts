import {connectDB} from "@config/db.js";
import {env} from "@config/env.js";
import {app} from "@/app.js";
import {logger} from "@shared/logger/logger.js";
import  { createServer, type Server} from "node:http";
import type {AddressInfo} from "node:net";


const CONNECTIONS_CHECKING_INTERVAL = 5_000;
const KEEP_ALIVE_TIMEOUT = 65_000;
const HEADERS_TIMEOUT = 30_000;
const REQUEST_TIMEOUT = 30_000;


let server: Server | null = null;
let httpClosePromise: Promise<void> | null = null;
let listPromise : Promise<AddressInfo> | null = null;
let exitPromise : Promise<never> | null = null;
let pendingPromise  = 0;
let drainController : AbortController | null = null;





const logSafely = (
    level : "fatal | error" | "info" | "warn",
    bindings: Record<string, unknown>,
    message: string,

): void => {

    try {
        logger[level](bindings, message)
    }catch (error) {
        try {
            logger[level](`${message} logger failed with error: ${error}`);
        }catch {

        }
    }

}


const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            logger.info(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        logger.error(error);

        process.exit(1);
    }
};

startServer();
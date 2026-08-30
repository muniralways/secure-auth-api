import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {logger} from "@shared/logger/logger.js";
import {pinoHttp} from "pino-http";


export const app = express();

app.set("trust proxy", true);

app.use(pinoHttp({ logger }));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "API Running",
    });
});
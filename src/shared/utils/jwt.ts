

import jwt from "jsonwebtoken";
import {authConfig} from "@config/auth.js";
import type { StringValue } from "ms";

export interface  AccessTokenPayload {
    userId: string,
    role: 'user' | 'admin'
}


export interface  RefreshTokenPayload {
    userId: string,
}


export const signAccessToken = (payload : AccessTokenPayload): string => {
    return  jwt.sign(payload, authConfig.accessToken.secret, {
        expiresIn: authConfig.accessToken.expiresIn as StringValue
    })
}


export  const signRefreshToken = (payload : RefreshTokenPayload): string => {

    return  jwt.sign(payload, authConfig.RefreshToken.secret, {
        expiresIn: authConfig.accessToken.expiresIn as StringValue
    })
}

export const verifyAccessToken = (
    token: string
): AccessTokenPayload => {
    return jwt.verify(
        token,
        authConfig.accessToken.secret
    ) as AccessTokenPayload;
};

export const verifyRefreshToken = (
    token: string
): RefreshTokenPayload => {
    return jwt.verify(
        token,
        authConfig.RefreshToken.secret,
    ) as RefreshTokenPayload;
};
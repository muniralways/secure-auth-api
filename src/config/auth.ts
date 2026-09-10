import {env} from "@config/env.js";


export const authConfig = {
    accessToken: {
        secret: env.JWT_ACCESS_SECRET,
        expiresIn: env.ACCESS_TOKEN_EXPIRES,

    },
    RefreshToken: {
        secret: env.JWT_REFRESH_SECRET,
        expiresIn: env.REFRESH_TOKEN_EXPIRES,

    }

}
import {connectDB} from "@config/db.js";
import {env} from "@config/env.js";
import {app} from "@/app.js";
import {logger} from "@shared/logger/logger.js";

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
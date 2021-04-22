import cluster from "cluster";
import { initDatabase } from "./entities";
import { startServer } from "./server";
import { RUN_TYPE, NODE_ENV } from "./config";

(async function () {
    if (cluster.isMaster) {
        console.info(`Starting application... Run Type: ${RUN_TYPE.toUpperCase()}`);
        if (NODE_ENV !== 'production')
            console.warn(`For production usage set NODE_ENV to 'production'.`);         
    }

    try {
        if (RUN_TYPE === 'api')
            return await startAPI();

        throw new Error(`Unsupported run type: ${RUN_TYPE}`);
    } catch (error) {
        terminate(error);
    }

})();

async function startAPI(): Promise<void> {
    await initDatabase();
    await startServer();
}

function terminate(error: Error) {
    console.error("Terminating due to initialization error: ", error);
    process.exit(1);
}


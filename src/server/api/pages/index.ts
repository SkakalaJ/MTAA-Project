import { Router, Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { router as userRouter } from "./user";

export function attachRouters(app: Application): Application {
    const router = Router();

    router.use('*', bodyParser.urlencoded({ limit: '5mb', extended: true }));
    router.use('*', bodyParser.json({ limit: '5mb' }));
    router.use('*', bodyParser.raw({ limit: '5mb '}));
    router.use('/user/', userRouter);

    // Home URL
    router.route('*').all(function (req: Request, res: Response) {
        res.status(404).send({ error: false, message: 'Hello from Home page'});
    });

    // Mismatch URL
    router.route('*').all(function (req: Request, res: Response) {
        res.status(404).send({ error: true, message: 'Check your URL please'});
    });

    app.use(router);

    return app;
}
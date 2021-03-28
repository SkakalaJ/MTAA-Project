import { Router, Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { router as userRouter } from "./user";
import { router as roomRouter } from "./room";

export function attachRouters(app: Application): Application {
    const router = Router();

    router.use('*', bodyParser.urlencoded({ limit: '5mb', extended: true }));
    router.use('*', bodyParser.json({ limit: '5mb' }));
    router.use('*', bodyParser.raw({ limit: '5mb '}));
    router.use('/api/users/', userRouter);
    router.use('/api/rooms/', roomRouter);

    // Home URL
    router.route('/').all(function (req: Request, res: Response) {
        res.status(200).send({ error: false, message: 'Hello from Home page'});
    });

    // Mismatch URL
    router.route('*').all(function (req: Request, res: Response) {
        res.status(404).send({ error: true, message: '404 page not found'});
    });

    app.use(router);

    return app;
}
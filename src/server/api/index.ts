import { Router, Application } from 'express';
import { attachRouters } from "./pages";

export function attachPages(app: Application): Application {
    const router = Router();

    attachRouters(app);

    app.use(router);
    
    return app;
}

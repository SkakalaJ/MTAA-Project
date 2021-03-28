import { Router, Request, Response } from 'express';

export const router = Router();

router.route('/').get(function (req: Request, res: Response){
    res.status(200).send('hello users');
});

router.route('/:userId').get(function (req: Request, res: Response){
    res.status(200).send('hello user ' + req.params.userId);
});
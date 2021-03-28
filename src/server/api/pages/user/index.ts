import { Router, Request, Response } from 'express';
import { TLoginRequest, TLoginResponse } from '../../types';
import * as user from "../../controllers/UserController";

export const router = Router();

router.route('/').get(function (req: Request, res: Response){
    res.status(200).send('hello users');
});

router.route('/login').get(user.verifyLogin);

router.route('/register').get(function (req: Request, res: Response){
    res.status(200).send('hello user register');
});

router.route('/:userId').get(function (req: Request, res: Response){
    res.status(200).send('hello user ' + req.params.userId);
});
import { Request, Response, NextFunction } from 'express';
import { TLoginRequest, TLoginResponse } from '../types';
import { ELoginError } from '../types/errors';
import * as User from '../../../models/User';

export async function verifyLogin(req: Request, res: Response, next: NextFunction){
    const body: TLoginRequest = req.body;

    let responseObj: TLoginResponse = {
        data: null,
        error: null,
    };

    if (body.username == null || body.password == null){
        responseObj.error = ELoginError.Empty;
        return res.status(401).send(responseObj);
    }

    if (!body.username.trim() || !body.password.trim()){
        responseObj.error = ELoginError.Empty;
        return res.status(401).send(responseObj);
    }

    const user = await User.login(body.username, body.password);

    if(!user){
        responseObj.error = ELoginError.Invalid;
        return res.status(401).send(responseObj);
    }

    return res.status(200).send('hello user login success');

    // res.status(200).send('hello user login');
}
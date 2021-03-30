import * as EmailValidator from 'email-validator';
import { Request, Response, NextFunction, response } from 'express';
import { TUser, TLoginRequest, TLoginResponse, TLoginResponseData, TRegisterRequest, TRegisterResponse, TRegisterResponseData, TLogoutRequest, TLogoutResponse, TUpdatePasswdResponse, TUpdatePasswdRequest } from '../types';
import { ELoginError, ELogoutError, ERegisterError, EPasswdUpdateError } from '../types/errors';
import * as UserModel from '../../../models/User';
import { checkAuthorizationHeader as checkAuthHeader } from './AuthorizationController';
import { EDeviceType } from '../../../types/entities';
import { Session } from '../../../entities/Session';
import { User } from '../../../entities/User';

export async function verifyLogin(req: Request, res: Response, next: NextFunction): Promise<any>{

    let responseObj: TLoginResponse = {
        data: null,
        error: null,
    };

    if( !(await checkLoginParams(req)) ){
        responseObj.error = ELoginError.Request;
        return res.status(400).send(responseObj);
    }

    const body: TLoginRequest = req.body;

    if (!body.username.trim() || !body.password.trim()){
        responseObj.error = ELoginError.Empty;
        return res.status(401).send(responseObj);
    }

    let session: Session;
    try{
        session = await UserModel.login(body.username, body.password, body.geolocation, body.geoParams, body.device);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    const data: TLoginResponseData = {
        userBid: session.user.bid,
        username: session.user.username,
        accessToken: session.token
    }

    responseObj.data = data;
    return res.status(307).send(responseObj);
}

export async function registerUser(req: Request, res: Response, next: NextFunction): Promise<any>{
    let responseObj: TRegisterResponse = {
        data: null,
        error: null,
    };

    try{
        await checkRegisterParams(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(400).send(responseObj);
    }

    try{
        await checkRegisterUsernameAndEmail(req);
        await checkRegisterPasswd(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    const body: TRegisterRequest = req.body;

    let user: User;
    try{
        user = await UserModel.register(body.username, body.password, body.email, body.phone);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    const data: TRegisterResponseData = {
        userBid: user.bid,
        username: user.username,
        email: user.email,
        phone: user.phone,
        verified: user.verified,
        avatar: user.avatar
    }

    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function updatePassword(req: Request, res: Response, next: NextFunction){
    let responseObj: TUpdatePasswdResponse = {
        data: null,
        error: null,
    };

    let token;
    try{
        token = await checkAuthHeader(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    try{
        await checkPasswdUpdateParams(req);
    }catch(err){
        responseObj.error = EPasswdUpdateError.Request;
        return res.status(400).send(responseObj);
    }

    const body: TUpdatePasswdRequest = req.body;
    
    if(body.password === body.newPassword){
        responseObj.error = EPasswdUpdateError.Same;
        return res.status(400).send(responseObj);
    }

    let user:User;
    try{
        user = await UserModel.updatePassword(body.userBid, body.password, body.newPassword, token);
    }catch(err){
        responseObj.error = err.message;

        if(err.message === EPasswdUpdateError.UpdateServerError)
            return res.status(500).send(responseObj);

        return res.status(401).send(responseObj);
    }

    const data: TUser = {
        bid: user.bid,
        username: user.username,
        email: user.email,
        phone: user.phone,
        verified: user.verified,
        avatar: user.avatar
    };
    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function logoutUser(req: Request, res: Response, next: NextFunction): Promise<any>{
    let responseObj: TLogoutResponse = {
        data: null,
        error: null,
    };

    let token;
    try{
        token = await checkAuthHeader(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    try{
        await checkLogoutParams(req);
    }catch(err){
        responseObj.error = ELogoutError.Request;
        return res.status(400).send(responseObj);
    }

    const body: TLogoutRequest = req.body;

    try{
        responseObj.data = await UserModel.logout(body.userBid, token);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    return res.status(200).send(responseObj);
}

export async function checkLogoutParams(req: Request): Promise<boolean>{
    if( req.body.userBid == null )
            return false;
    
    return true;
}

export async function checkLoginParams(req: Request): Promise<boolean>{
    if( req.body.username == null ||
        req.body.password == null ||
        req.body.geolocation == null ||
        req.body.device == null ||
        req.body.device.type == null ||
        !Object.values(EDeviceType).includes(req.body.device.type)
        )
            return false;
    
    return true;
}

export async function checkRegisterParams(req: Request): Promise<boolean>{
    if( req.body.username == null ||
        req.body.password == null ||
        req.body.email == null
        )
            throw new Error(ERegisterError.Request);
    
    return true;
}

export async function checkPasswdUpdateParams(req: Request): Promise<boolean>{
    if( req.body.password == null ||
        req.body.userBid == null
        )
            throw new Error(ERegisterError.Request);
    
    return true;
}

export async function checkRegisterPasswd(req: Request): Promise<boolean>{

    if( !isAlphaNumericWithSpecialChars(req.body.password) )
        throw new Error(ERegisterError.Invalid);

    if( req.body.password.length < 8 )
        throw new Error(ERegisterError.ShortPasswd);

    if( req.body.password.length > 511 )
        throw new Error(ERegisterError.LongPasswd);

    if( !hasLowerCase(req.body.password) )
        throw new Error(ERegisterError.WeakPasswd);

    if( !hasUpperCase(req.body.password) )
        throw new Error(ERegisterError.WeakPasswd);

    if( !hasNumber(req.body.password) )
        throw new Error(ERegisterError.WeakPasswd);

    if( !validateEmailFormat(req.body.email) )
        throw new Error(ERegisterError.Email);

    return true;
}

export async function checkRegisterUsernameAndEmail(req: Request): Promise<boolean>{

    if( !isAlphabetical(req.body.username) )
        throw new Error(ERegisterError.AlphaUsername);

    if( req.body.username.length < 5 )
        throw new Error(ERegisterError.ShortUsername);

    if( req.body.username.length > 44 )
        throw new Error(ERegisterError.LongUsername);

    if( !validateEmailFormat(req.body.email) )
        throw new Error(ERegisterError.Email);

    return true;
}

function hasLowerCase(str: string) {
    return str.toUpperCase() != str;
}

function hasUpperCase(str: string) {
    return str.toLowerCase() != str;
}

function hasNumber(str: string){
    return (/[0-9]/.test(str));
}

function isAlphabetical(str: string){
    if( /[^a-zA-Z]/.test( str ) ) {
        return false;
    }
    
    return true;
}

function isAlphaNumericWithSpecialChars(str: string) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 32 && code < 127)) { // (a-z) (A-Z) (special chars) (0-9)
        return false;
      }
    }
    return true;
};

function validateEmailFormat(email: string){
    return EmailValidator.validate(email);
}
import { Request, Response, NextFunction, response } from 'express';
import { EMessageError } from '../types/errors';
import { TMessageRequest, TMessageResponse, TMessageResponseData, TAnyResponse } from '../types';
import { checkAuthorizationHeader as checkAuthHeader } from './AuthorizationController';
import { Session } from '../../../entities/Session';
import * as SessionModel from '../../../models/Session';
import * as MessageModel from '../../../models/Message';
import * as MediaModel from '../../../models/Media';
import * as UserModel from '../../../models/User';

export async function getMessages(req: Request, res: Response, next: NextFunction): Promise<any>{
    const offset = req.query.offset;
    const roomId = req.params.roomId;

    let responseObj: TAnyResponse = {
        data: null,
        error: null,
    };

    if(req.params.roomId == null){
        responseObj.error = EMessageError.Request;
        return res.status(400).send(responseObj);
    }

    let token;
    try{
        token = await checkAuthHeader(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    let session:Session | null;
    try{
        session = await SessionModel.getByToken(token);
        if(!session)
            throw new Error(EMessageError.Permission);

    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    const user = await UserModel.getByIdWithRoomId(session.userId, Number(roomId));

    if(!user){
        responseObj.error = EMessageError.Permission;
        return res.status(401).send(responseObj);
    }

    const messages = await MessageModel.findForRoomOffset(Number(offset), 30, Number(roomId));

    let msgs = [];
    if( messages && messages?.length > 0 )
        for (const msg of messages) {
            let m: any = {
                id:msg.id,
                userId: msg.userId,
                content: msg.content,
                createdAt: msg.createdAt,
                medium: msg.medium,
                medias: []
            }

            if(m.medium === true){
                for (const medium of msg.medias) {
                    m.medias.push({id: medium.id, name: medium.name, fileName: medium.fileName, type: medium.type, format: medium.format, url: medium.url });
                }
            }
            else{
                m.medias = null;
            }

            msgs.push(m);
        }

    let data: any = {
        roomId: Number(roomId),
        itemCount: msgs.length,
        items: msgs
    }

    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function processMessage(req: Request, res: Response, next: NextFunction): Promise<any>{
    let responseObj: TMessageResponse = {
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
        await checkMessageParams(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(400).send(responseObj);
    }

    const body: TMessageRequest = req.body;

    if (!body.content.trim() && body.medium === false){
        responseObj.error = EMessageError.Empty;
        return res.status(400).send(responseObj);
    }

    let session:Session | null;
    try{
        session = await SessionModel.getByToken(token);
        if(!session)
            throw new Error(EMessageError.Permission);

    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    let msg, medias;
    try{
        [msg,medias] = await MessageModel.storeMessage(body, session, Number(req.params.roomId));
    }catch(err){
        responseObj.error = err.message;

        if(err.message === EMessageError.ServerError)
            return res.status(500).send(responseObj);

        return res.status(401).send(responseObj);
    }

    const data: TMessageResponseData = {
        roomId: Number(req.params.roomId),
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        sentBy: {
            avatar: null,
            bid: session.user.bid,
            username: session.user.username,
            owner: true
        },
        seenBy: [
            {
                avatar: null,
                bid: session.user.bid,
                username: session.user.username,
                owner: true
            }
        ],
        media: ( medias != null && medias?.length > 0 ) ? true : false,
        medias: medias
    }

    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function deleteMessage(req: Request, res: Response, next: NextFunction): Promise<any>{
    let responseObj: TAnyResponse = {
        data: null,
        error: null,
    };

    if(req.params.roomId == null || req.params.messageId == null){
        responseObj.error = EMessageError.Request;
        return res.status(400).send(responseObj);
    }

    let token;
    try{
        token = await checkAuthHeader(req);
    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    let session:Session | null;
    try{
        session = await SessionModel.getByToken(token);
        if(!session)
            throw new Error(EMessageError.Permission);

    }catch(err){
        responseObj.error = err.message;
        return res.status(401).send(responseObj);
    }

    const message = await MessageModel.getByIdForUser(Number(req.params.messageId), session.userId);

    if(!message){
        responseObj.error = EMessageError.Permission;
        return res.status(401).send(responseObj);
    }

    const delMessage = await MessageModel.deleteMessage(message.roomId, Number(req.params.messageId), session.userId);

    if( delMessage <= 0 ){
        responseObj.error = EMessageError.Permission;
        return res.status(401).send(responseObj);
    }

    const delMedias = await MediaModel.deleteByIds(message.medias);
    
    let data: any = {
        id: message.id,
        roomId: message.roomId,
        medium: message.medium,
        medias: []
    }

    for (const medium of message.medias) {
        data.medias.push({id: medium.id, name: medium.name, fileName: medium.fileName, type: medium.type, format: medium.format, url: medium.url });
    }

    if(message.medium === false || data.medias == null || data.medias.length === 0)
        data.medias = null;

    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function checkMessageParams(req: Request): Promise<boolean>{
    if( req.params.roomId == null ||
        req.body.content == null ||
        req.body.medium == null
        )
            throw new Error(EMessageError.Request);
    
    if(req.body.medium === true)
        if(req.body.medias == null)
            throw new Error(EMessageError.Request);

    return true;
}
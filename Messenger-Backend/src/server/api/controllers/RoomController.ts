import { Request, Response, NextFunction } from 'express';
import { TAnyResponse } from '../types';
import { ELoginError, EMessageError } from '../types/errors';
import * as Room from '../../../entities/Room';
import * as UserModel from '../../../models/User';
import * as RoomModel from '../../../models/Room';
import { TRoom } from '../types';
import { Session } from '../../../entities/Session';
import * as SessionModel from '../../../models/Session';
import { checkAuthorizationHeader as checkAuthHeader } from './AuthorizationController';


export async function createRoom(req: Request, res: Response, next: NextFunction): Promise<any>{
    console.log("CREATE ROOM");

    let responseObj: TAnyResponse = {
        data: null,
        error: null,
    };

    if(req.body.name == null){
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

    const name = req.body.name;
    const newRoom = await RoomModel.create(name, null);

    let room;
    if(newRoom)
        room = await RoomModel.getById(newRoom?.id);

    if(!room){
        responseObj.error = "Internal server error.";
        return res.status(500).send(responseObj);
    }

    let data: any = {
        id: room.id,
        name: room.name,
        createdAt: room.createdAt,
        avatar: room.avatar
    }

    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function updateRoom(req: Request, res: Response, next: NextFunction): Promise<any>{

    console.log("UPDATE ROOM");

    let responseObj: TAnyResponse = {
        data: null,
        error: null,
    };

    if(req.body.name == null && req.params.roomId){
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

    const name: string = req.body.name;
    const roomId = req.params.roomId;
     await RoomModel.updateNameOfRoom(name, Number(roomId));

    let room;
    room = await RoomModel.getById(Number(roomId));

    if(!room){
        responseObj.error = "Internal server error.";
        return res.status(500).send(responseObj);
    }

    let data: any = {
        id: room.id,
        name: room.name,
        createdAt: room.createdAt,
        avatar: room.avatar
    }

    responseObj.data = data;
    return res.status(200).send(responseObj);
}

export async function deleteRoom(req: Request, res: Response){

    console.log("DELETE ROOM");
    
    const body: TRoom = req.body;
    
    let isDeleted;
    try{
        isDeleted = RoomModel.destroy(body.id);
    }catch(err){
        return res.status(401).send(err.message);
    }

    return isDeleted;
}
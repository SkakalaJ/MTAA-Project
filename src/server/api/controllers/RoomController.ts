import { Request, Response, NextFunction } from 'express';
import { TLoginRequest, TLoginResponse } from '../types';
import { ELoginError } from '../types/errors';

import * as Room from '../../../entities/Room';
import * as UserModel from '../../../models/User';
import * as RoomModel from '../../../models/Room';
import { TRoom } from '../types';


export async function createRoom(req: Request, res: Response){
    const body: TRoom = req.body;

    let room;
    try{
        room = await RoomModel.create({name: body.name, avatar: body.avatar});
    }catch(err){
        return res.status(401).send(err.message);
    }

    return room;
}

export async function updateRoom(req: Request, res: Response){

    const body: TRoom = req.body;

    let room;
    try{
        room = await RoomModel.updateNameOfRoom(body.name, body.id);
    }catch(err){
        return res.status(401).send(err.message);
    }
    return room;
}

export async function deleteRoom(req: Request, res: Response){
    
    const body: TRoom = req.body;
    
    let isDeleted;
    try{
        isDeleted = RoomModel.destroy(body.id);
    }catch(err){
        return res.status(401).send(err.message);
    }

    return isDeleted;
}
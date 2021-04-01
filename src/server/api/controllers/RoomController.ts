import { Request, Response, NextFunction } from 'express';
import { TLoginRequest, TLoginResponse } from '../types';
import { ELoginError } from '../types/errors';

import * as Room from '../../../models/Room';
import * as UserModel from '../../../models/User';
import * as RoomModel from '../../../models/Room';
import { TRoom } from '../types';


export async function createRoom(req: Request, res: Response){
    const body: TRoom = req.body;

    RoomModel.create(body);
}

export async function updateRoom(req: Request, res: Response){

    const body: TRoom = req.body;

    RoomModel.updateNameOfRoom(body.name, body.id);

}

export async function deleteRoom(req: Request, res: Response){
    const body: TRoom = req.body;
    RoomModel.destroy(body.id);
}
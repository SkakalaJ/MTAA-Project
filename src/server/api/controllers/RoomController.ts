import { Request, Response, NextFunction } from 'express';
import { TLoginRequest, TLoginResponse } from '../types';
import { ELoginError } from '../types/errors';
import * as Room from '../../../models/Room';
import { Room as DbRoom} from '../../../entities/Room';
import { User as DbUser} from '../../../entities/User';

export async function getRoomsWithUsersAndMessages(req: Request, res: Response, next: NextFunction){
    const body: TLoginRequest = req.body;

    let responseObj: TLoginResponse = {
        data: null,
        error: null,
    };

    // todo fix loading all rooms with relationships

    DbRoom.belongsToMany(DbUser, { through: 'room_users', foreignKey: 'roomId' });
    DbUser.belongsToMany(DbRoom, { through: 'room_users', foreignKey: 'userId' });

    DbRoom.findAll({
        include:[{model: DbUser, required:true}]
    })
    .then((rooms: DbRoom[]) => res.status(200).json({ rooms }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
}
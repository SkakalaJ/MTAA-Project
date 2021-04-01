import { Request, Response, NextFunction } from 'express';
import { TLoginRequest, TLoginResponse } from '../types';
import { ELoginError } from '../types/errors';

import * as Room from '../../../models/Room';
import * as UserModel from '../../../models/User';
// import { Room as DbRoom} from '../../../entities/Room'; // snazime sa importovat model, ktory bude pracovat s entitou, nie priamo entitu
// import { User as DbUser} from '../../../entities/User';

export async function getRoomsWithUsersAndMessages(req: Request, res: Response, next: NextFunction){
    const body: TLoginRequest = req.body;

    let responseObj: TLoginResponse = {
        data: null,
        error: null,
    };

    // todo fix loading all rooms with relationships

    // DbRoom.belongsToMany(DbUser, { through: 'room_users', foreignKey: 'roomId' }); // uz defunovane v .../entities/User
    // DbUser.belongsToMany(DbRoom, { through: 'room_users', foreignKey: 'userId' }); // uz defunovane v .../entities/Room

    const room = await Room.getById(1);

    console.log("ROOM BY ID");
    if( room ){
        console.log(room.name);
        console.log(room.users[0].username);
        console.log(room.users[1].username);
    }

    const rooms = await Room.getAll();

    console.log(rooms);
    
    console.log("ALL ROOMS");
    rooms.forEach(room => {
        console.log(room.name);
        console.log(room.users[0].username);
        console.log(room.users[1].username);
    }
    );

    // DbRoom.findAll({
    //     include:[{model: DbUser, required:true}]
    // })
    // .then((rooms: DbRoom[]) => res.status(200).json({ rooms }))
    // .catch(err => res.status(500).json({ err: ['oops', err] }));
}
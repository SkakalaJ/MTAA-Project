import { Router, Request, Response } from 'express';
import { TLoginRequest, TLoginResponse } from '../../types';
import * as room from "../../controllers/RoomController";
import { Room as DbRoom} from '../../../../entities/Room';

export const router = Router();

router.route('/').get(function (req: Request, res: Response){
    DbRoom.findAll()
    .then((rooms: DbRoom[]) => res.status(200).json({ rooms }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

router.route('/all').get(room.getRoomsWithUsersAndMessages);

router.route('/:roomId').get(function (req: Request, res: Response){
    res.status(200).send('hello room ' + req.params.roomId);
});
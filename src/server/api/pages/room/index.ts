import { Router, Request, Response } from 'express';
import { TLoginRequest, TLoginResponse } from '../../types';
import * as room from "../../controllers/RoomController";

export const router = Router();

router.route('/').get(function (req: Request, res: Response){
    res.send('all');
});

router.route('/:roomId').get(function (req: Request, res: Response){
    res.status(200).send('hello room ' + req.params.roomId);
});

router.route('/').post(room.createRoom);

router.route('/:roomId').put(room.createRoom);

router.route('/:roomId').delete(room.deleteRoom);
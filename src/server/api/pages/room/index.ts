import { Router, Request, Response } from 'express';
import * as room from "../../controllers/RoomController";
import * as message from "../../controllers/MessageController";

export const router = Router({ mergeParams: true });

router.route('/').get(function (req: Request, res: Response){
    res.send('all');
});

router.route('/:roomId').get(function (req: Request, res: Response){
    res.status(200).send('hello room ' + req.params.roomId);
});

router.route('/').post(room.createRoom);

router.route('/:roomId').put(room.createRoom);

router.route('/:roomId').delete(room.deleteRoom);
// router.route('/all').get(room.getRoomsWithUsersAndMessages);


router.route('/:roomId/messages').post(message.processMessage);
router.route('/:roomId/messages').get(message.getMessages);
router.route('/:roomId/messages/:messageId').delete(message.deleteMessage);

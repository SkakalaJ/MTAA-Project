import { Router, Request, Response } from 'express';
import * as user from "../../controllers/UserController";

export const router = Router();

router.route('/').get(function (req: Request, res: Response){
    res.status(200).send('hello users');
});

router.route('/login').post(user.verifyLogin);
router.route('/register').post(user.registerUser);
router.route('/logout').post(user.logoutUser);
router.route('/password').put(user.updatePassword);

router.route('/rooms').get(user.getUserWithRooms);

router.route('/:userId/rooms').get(function (req: Request, res: Response){
    res.status(200).send('hello user ' + req.params.userId);
});
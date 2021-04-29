import { Router, Request, Response } from 'express';
import * as user from "../../controllers/UserController";

export const router = Router();


router.route('/login').post(user.verifyLogin);
router.route('/register').post(user.registerUser);
router.route('/logout').post(user.logoutUser);
router.route('/password').put(user.updatePassword);
router.route('/:userId').get(user.getUser);
router.route('/').get(user.getAllUsers);

router.route('/rooms').get(user.getUserWithRooms);

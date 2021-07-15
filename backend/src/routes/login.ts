import {Router} from 'express';
import {LOGIN_ENDPOINT} from 'config';
import {loginController} from 'controllers/login';

export const router = Router();

router.post(LOGIN_ENDPOINT, loginController);

export default router;

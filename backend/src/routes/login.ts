import {Router} from 'express';
import {AccountModel} from 'models/account';
import {ERROR_INVALID_PUBLIC_ADDRESS} from 'data/errors';
import {LOGIN_ENDPOINT} from 'config';
import {loginController} from 'controllers/login';

export const router = Router();

router.post(LOGIN_ENDPOINT, loginController);

export default router;

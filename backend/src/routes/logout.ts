import {Router} from 'express';
import {LOGOUT_ENDPOINT} from 'config';
import {logoutController} from 'controllers/logout';
import {authGuard} from 'middlewares/auth';

export const router = Router();

router.post(LOGOUT_ENDPOINT, authGuard, logoutController);

export default router;

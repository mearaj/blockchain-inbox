import {Router} from 'express';
import {LOGIN_ENDPOINT} from 'config';
import {isLoggedInController, loginController} from 'controllers/login';
import {authGuard} from 'controllers/guards/auth';

export const router = Router();

router.post(LOGIN_ENDPOINT, loginController);
router.get(LOGIN_ENDPOINT, authGuard,isLoggedInController);

export default router;

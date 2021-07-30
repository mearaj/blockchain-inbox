import {Router} from 'express';
import token from './token';
import login from './login';
import logout from './logout';
import outbox from './outbox';
import claims from './claim';
import sent from './sent';
import inbox from './inbox';

const router = Router();

router.use(token);
router.use(login);
router.use(logout);
router.use(outbox);
router.use(claims);
router.use(sent);
router.use(inbox);

export default router;

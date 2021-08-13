import {Router} from 'express';
import token from './token';
import login from './login';
import logout from './logout';
import outbox from './outbox';
import claim from './claim';
import sent from './sent';
import inbox from './inbox';
import unknown from "./unknown";

const router = Router();

router.use(token);
router.use(login);
router.use(claim);
router.use(logout);
router.use(outbox);
router.use(sent);
router.use(inbox);
router.use(unknown);

export default router;

import {Router} from 'express';
import {CLAIM_ENDPOINT, SENT_ENDPOINT} from 'config';
import {authGuard} from 'middlewares/auth';
import {outboxGuard} from 'middlewares/outbox';
import {getSentController} from 'controllers/sent';

const router = Router();

router.get(SENT_ENDPOINT, authGuard, outboxGuard, getSentController);
export default router;


import {Router} from 'express';
import {SENT_ENDPOINT} from 'config';
import {authGuard} from 'controllers/guards/auth';
import {outboxGuard} from 'controllers/guards/outbox';
import {getSentController} from 'controllers/sent';

const router = Router();

router.get(SENT_ENDPOINT, authGuard, outboxGuard, getSentController);
export default router;

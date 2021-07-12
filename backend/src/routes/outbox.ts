import {Router} from 'express';
import {OUTBOX_ENDPOINT} from 'config';
import {getOutboxController, getOutboxMessageByIdController, saveOutboxMessageController} from 'controllers/outbox';
import {authGuard} from 'middlewares/auth';
import {outboxGuard} from 'middlewares/outbox';

const router = Router();

// Current logged in users can retrieve outbox, but cannot create/post message if user is not logged in through
// Bluezelle Mainnet

router.get(OUTBOX_ENDPOINT, authGuard, getOutboxController);
router.get(`${OUTBOX_ENDPOINT}/:id`, authGuard, getOutboxMessageByIdController);
router.post(OUTBOX_ENDPOINT, authGuard, outboxGuard, saveOutboxMessageController);

export default router;

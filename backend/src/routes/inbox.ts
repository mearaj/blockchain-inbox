import {Router} from 'express';
import {INBOX_ENDPOINT, OUTBOX_ENDPOINT} from 'config';
import {getOutboxController, getOutboxMessageByIdController, saveOutboxMessageController} from 'controllers/outbox';
import {authGuard} from 'controllers/guards/auth';
import {outboxGuard} from 'controllers/guards/outbox';
import {getInboxController, getInboxMessageByIdController} from 'controllers/inbox';

const router = Router();

// Current logged in users can retrieve outbox, but cannot create/post message if user is not logged in through
// Bluezelle Mainnet

router.get(INBOX_ENDPOINT, authGuard, getInboxController);
router.get(`${INBOX_ENDPOINT}/:id`, authGuard, getInboxMessageByIdController);

export default router;

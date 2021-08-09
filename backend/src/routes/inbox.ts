import {Router} from 'express';
import {INBOX_ENDPOINT, INBOX_RENEW_LEASE_ENDPOINT} from 'config';
import {authGuard} from 'controllers/guards/auth';
import {onlyBluzelleAccount} from 'controllers/guards/outbox';
import {getInboxMessageByIdController} from 'controllers/inbox';
import {putRenewLeaseController} from 'controllers/lease';
import {deleteMessageController, getMessagesController} from 'controllers/message';

const router = Router();

// Current logged in users can retrieve outbox, but cannot create/post message if user is not logged in through
// Bluezelle

router.get(INBOX_ENDPOINT, authGuard, getMessagesController);
router.delete(INBOX_ENDPOINT, authGuard, onlyBluzelleAccount, deleteMessageController);
router.get(`${INBOX_ENDPOINT}/:id`, authGuard, getInboxMessageByIdController);
router.put(INBOX_RENEW_LEASE_ENDPOINT, authGuard, onlyBluzelleAccount, putRenewLeaseController);

export default router;

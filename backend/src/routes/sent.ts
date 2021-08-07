import {Router} from 'express';
import {SENT_ENDPOINT, SENT_RENEW_LEASE_ENDPOINT} from 'config';
import {authGuard} from 'controllers/guards/auth';
import {onlyBluzelleAccount} from 'controllers/guards/outbox';
import {getMessagesController} from 'controllers/messages';
import {putRenewLeaseController} from 'controllers/lease';

const router = Router();

router.get(SENT_ENDPOINT, authGuard, onlyBluzelleAccount, getMessagesController);
router.put(SENT_RENEW_LEASE_ENDPOINT, authGuard,onlyBluzelleAccount, putRenewLeaseController);
export default router;

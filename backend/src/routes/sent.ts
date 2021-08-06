import {Router} from 'express';
import {SENT_ENDPOINT, SENT_RENEW_LEASE_ENDPOINT} from 'config';
import {authGuard} from 'controllers/guards/auth';
import {onlyBluzelleAccount} from 'controllers/guards/outbox';
import {getSentController, putSentRenewLease} from 'controllers/sent';

const router = Router();

router.get(SENT_ENDPOINT, authGuard, onlyBluzelleAccount, getSentController);
router.put(SENT_RENEW_LEASE_ENDPOINT, authGuard,onlyBluzelleAccount, putSentRenewLease);
export default router;

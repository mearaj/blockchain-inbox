import {Router} from 'express';
import {CLAIM_ENDPOINT} from 'config';
import {getClaimController} from 'controllers/claim';
import {authGuard} from 'controllers/guards/auth';
import {onlyBluzelleAccount} from 'controllers/guards/outbox';

const router = Router();

router.post(CLAIM_ENDPOINT, authGuard, onlyBluzelleAccount, getClaimController);
export default router;


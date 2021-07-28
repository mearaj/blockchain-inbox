import {Router} from 'express';
import {CLAIM_ENDPOINT, TOKEN_ENDPOINT} from 'config';
import {requestLoginToken} from 'controllers/token';
import {getClaimController} from 'controllers/claim';
import {authGuard} from 'controllers/guards/auth';
import {outboxGuard} from 'controllers/guards/outbox';

const router = Router();

router.post(CLAIM_ENDPOINT, authGuard, outboxGuard,getClaimController);
export default router;


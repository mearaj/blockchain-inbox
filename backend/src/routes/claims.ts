import {Router} from 'express';
import {CLAIM_ENDPOINT, TOKEN_ENDPOINT} from 'config';
import {requestLoginToken} from 'controllers/token';

const router = Router();

router.post(CLAIM_ENDPOINT, requestLoginToken);
export default router;


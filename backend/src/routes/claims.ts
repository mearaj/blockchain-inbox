import {Router} from 'express';
import {CLAIMS_ENDPOINT, TOKENS_ENDPOINT} from 'config';
import {requestLoginToken} from 'controllers/tokens';

const router = Router();

router.post(CLAIMS_ENDPOINT, requestLoginToken);
export default router;


import {Router} from 'express';
import {TOKENS_ENDPOINT} from 'config';
import {requestLoginToken} from 'controllers/tokens';

const router = Router();

router.post(TOKENS_ENDPOINT, requestLoginToken);
export default router;


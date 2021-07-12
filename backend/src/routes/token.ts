import {Router} from 'express';
import {TOKEN_ENDPOINT} from 'config';
import {requestLoginToken} from 'controllers/token';

const router = Router();

router.post(TOKEN_ENDPOINT, requestLoginToken);
export default router;


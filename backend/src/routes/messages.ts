import {Router} from 'express';
import {SEND_MESSAGES_ENDPOINT} from 'config';

export const router = Router();

router.post(SEND_MESSAGES_ENDPOINT, (req,res, next)=> {
  console.log(req.body);
});

export default router;

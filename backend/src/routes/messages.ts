import {Router} from 'express';
import {SEND_MESSAGES_ENDPOINT} from 'config';

const router = Router();

router.post(SEND_MESSAGES_ENDPOINT, (req, res, next)=> {
  res.json({success:true})
  console.log(req.body);
});

export default router;

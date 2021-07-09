import {RequestHandler, Router} from 'express';
import {User} from 'models/user';
import {v4 as uuid} from 'uuid';
import {ERROR_INVALID_PUBLIC_ADDRESS} from 'data/errors';
import {users} from 'data/users';
import {LOGIN_ENDPOINT} from 'config';

export const router = Router();

router.post(LOGIN_ENDPOINT, (req, res, next) => {
  const {publicAddress,loginToken, signedToken} = req.body;
  if (!publicAddress || typeof publicAddress!=='string' || publicAddress.trim()==="") {
    return res.status(400).json({
      message: ERROR_INVALID_PUBLIC_ADDRESS
    })
  }
  const user = new User(publicAddress);
  users[user.getPublicAddressHexString()] = user;
  return res.json({loginResponse: user.getPublicAddressHexString()});
});

export default router;

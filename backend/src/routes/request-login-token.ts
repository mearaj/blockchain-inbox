import {Router} from 'express';
import {User} from 'models/user';
import {v4 as uuid} from 'uuid';
import {ERROR_INVALID_PUBLIC_ADDRESS} from 'data/errors';
import {users} from 'data/users';
import {isPublicAddressValid} from 'validators';
import {REQUEST_LOGIN_TOKEN_ENDPOINT} from 'config';

const router = Router();

router.post(REQUEST_LOGIN_TOKEN_ENDPOINT, (req, res, next) => {
    const {publicAddress} = req.body;
    if (!isPublicAddressValid(publicAddress)) {
      return res.status(400).json({
        message: ERROR_INVALID_PUBLIC_ADDRESS
      })
    }
    const user = new User(publicAddress);
    users[user.getPublicAddressHexString()] = user;
    return res.json({loginToken: user.getPublicAddressHexString()});
  }
);

export default router;

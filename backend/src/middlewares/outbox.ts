import {RequestHandler} from 'express';
import {Account} from 'models/account';


// This guard assumes, account and authToken available from auth guard,
// hence always call this method after calling auth guard or provide account and authToken as req fields
export const outboxGuard: RequestHandler = async (req, res, next) => {

  try {
    const account = (req as any).account as Account;

    if (account.chainName !=='Bluzelle Mainnet') {
      return res.status(401).json({
        error: {
          message: "Bluzelle/Curium login required for this request!"
        }
      });
    }
  } catch (e) {
    return res.status(404).json({
      error: {
        message: (e as any).messsage,
      }
    })
  }
  return next();
};

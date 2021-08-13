import {RequestHandler} from 'express';
import {Account} from 'models/account';
import {AppError} from "../../models/error";


// This guard assumes, account and authToken available from auth guard,
// hence always call this method after calling auth guard or provide account and authToken to req field
export const onlyBluzelleAccount: RequestHandler = async (req, res, next) => {
    try {
        const account = (req as any).account as Account;
        if (account.chainName !== 'Bluzelle Mainnet') {
            return next(new AppError("Bluzelle/Curium login required for this request!", 400));
        }
    } catch (e) {
        return next(new AppError());
    }
    return next();
};

import { NextFunction, Response, Request } from 'express';
import tokenService from '../services/token.service';
import { ApiError } from '../errors/api.error';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('fex_access') ? req.header('fex_access').split('Bearer ')[1] : null;
    if (!Authorization) next();
    const isValid = new tokenService().blacklistCheck(Authorization);
    if(!isValid) next();
    else {
      const verificationResponse = new tokenService().validateAccessToken(Authorization);
      req.body.user = verificationResponse;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
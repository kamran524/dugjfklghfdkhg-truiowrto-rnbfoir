import { NextFunction, Response,Request } from 'express';
import { ApiError } from '../errors/api.error';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';

const refreshMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('fex_refresh') ? req.header('fex_refresh').split('Bearer ')[1] : null;
    if (!Authorization) next(ApiError.UnauthorizedError());
    const isValid = new tokenService().blacklistCheck(Authorization);
    if(!isValid) next(ApiError.UnauthorizedError());
    else {
      const verificationResponse = await new authService().refresh(Authorization);
      if (!verificationResponse) next(ApiError.UnauthorizedError());
      else {
        res.setHeader('fex_access', `Bearer ${verificationResponse.accessToken}`);
        req.body.user = verificationResponse.user;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

export default refreshMiddleware;
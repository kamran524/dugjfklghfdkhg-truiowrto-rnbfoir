import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import AuthService from "../services/auth.service";
import {constants} from "http2";

class AuthController {
  private readonly AuthService: AuthService;

  constructor() {
    this.AuthService = new AuthService();
  }

  public SignUp = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AuthController.name}.SignUp -- start`);
      const result = await this.AuthService.SignUp(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${AuthController.name}.SignUp -- success`);
    } catch (error) {
      next(error);
    }
  };

  public LogIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AuthController.name}.LogIn -- start`);
      const result = await this.AuthService.LogIn(request);
      response.setHeader('fex_access',`Bearer ${result.accessToken}`);
      response.setHeader('fex_refresh',`Bearer ${result.refreshToken}`);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${AuthController.name}.LogIn -- success`);
    } catch (error) {
      next(error);
    }
  };
  public VerifyMail = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AuthController.name}.VerifyMail -- start`);
      const result = await this.AuthService.VerifyMail(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${AuthController.name}.VerifyMail -- success`);
    } catch (error) {
      next(error);
    }
  };
  public LogOut = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AuthController.name}.LogOut -- start`);
      const result = await this.AuthService.LogOut(request);
      response.setHeader('fex_access','');
      response.setHeader('fex_refresh','');
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${AuthController.name}.LogOut -- success`);
    } catch (error) {
      next(error);
    }
    
  }

}

export default AuthController;

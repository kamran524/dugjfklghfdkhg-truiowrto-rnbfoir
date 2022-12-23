import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import PhoneService from "../services/phone.service";

class PhoneController {
  private readonly phoneService: PhoneService;

  constructor() {
    this.phoneService = new PhoneService();
  }

  public createPhone = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PhoneController.name}.createPhone -- start`);
      const result = await this.phoneService.createPhone(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${PhoneController.name}.createPhone -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updatePhone = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PhoneController.name}.updatePhone -- start`);
      const result = await this.phoneService.updatePhone(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${PhoneController.name}.updatePhone -- success`);
    } catch (error) {
      next(error);
    }
  };

  public deletePhone = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PhoneController.name}.deletePhone -- start`);
      const result = await this.phoneService.deletePhone(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${PhoneController.name}.deletePhone -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getPhone = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PhoneController.name}.getPhone -- start`);
      const result = await this.phoneService.getPhone(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${PhoneController.name}.getPhone -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getPhones = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PhoneController.name}.getPhones -- start`);
      const result = await this.phoneService.getPhones();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${PhoneController.name}.getPhones -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default PhoneController;

import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import OperatorCodeService from "../services/phone.operator.service";

class OperatorCodeController {
  private readonly operatorCodeService: OperatorCodeService;

  constructor() {
    this.operatorCodeService = new OperatorCodeService();
  }

  public createOperatorCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${OperatorCodeController.name}.createOperatorCode -- start`
      );
      const result = await this.operatorCodeService.createOperatorCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${OperatorCodeController.name}.createOperatorCode -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public updateOperatorCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${OperatorCodeController.name}.updateOperatorCode -- start`
      );
      const result = await this.operatorCodeService.updateOperatorCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${OperatorCodeController.name}.updateOperatorCode -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public deleteOperatorCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${OperatorCodeController.name}.deleteOperatorCode -- start`
      );
      const result = await this.operatorCodeService.deleteOperatorCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${OperatorCodeController.name}.deleteOperatorCode -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public getOperatorCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OperatorCodeController.name}.getOperatorCode -- start`);
      const result = await this.operatorCodeService.getOperatorCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${OperatorCodeController.name}.getOperatorCode -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getOperatorCodes = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OperatorCodeController.name}.getOperatorCodes -- start`);
      const result = await this.operatorCodeService.getOperatorCodes();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${OperatorCodeController.name}.getOperatorCodes -- success`
      );
    } catch (error) {
      next(error);
    }
  };
}

export default OperatorCodeController;

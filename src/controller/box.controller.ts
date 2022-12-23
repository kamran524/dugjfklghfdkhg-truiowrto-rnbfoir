import { Request, Response, NextFunction } from "express";
import BoxService from "../services/box.service";
import logger from "../log/winston";
import { constants } from "http2";

class BoxController {
  private readonly boxService: BoxService;

  constructor() {
    this.boxService = new BoxService();
  }

  public createBox = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BoxController.name}.createBox -- start`);
      const result = await this.boxService.createBox(request);
      logger.debug(`${BoxController.name}.createBox -- success`);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getBoxes = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BoxController.name}.getBoxes -- start`);
      const result = await this.boxService.getBoxes();
      logger.debug(`${BoxController.name}.getBoxes -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getBox = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BoxController.name}.getBox -- start`);
      const result = await this.boxService.getBox(request);
      logger.debug(`${BoxController.name}.getBox -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public updateBox = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BoxController.name}.updateBox -- start`);
      const result = await this.boxService.updateBox(request);
      logger.debug(`${BoxController.name}.updateBox -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteBox = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BoxController.name}.deleteBox -- start`);
      const result = await this.boxService.deleteBox(request);
      logger.debug(`${BoxController.name}.deleteBox -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error)
    }
  }
}

export default BoxController;

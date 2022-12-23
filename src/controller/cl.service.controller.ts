import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import ClServiceService from "../services/cl.service.service";

class ClServiceController {
  private readonly clServiceService: ClServiceService;

  constructor () {
    this.clServiceService = new ClServiceService();
  }

  public createClService = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ClServiceController.name}.createClService -- start`);
      const result = await this.clServiceService.createClService(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${ClServiceController.name}.createClService -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updateClService = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ClServiceController.name}.updateClService -- start`);
      const result = await this.clServiceService.updateClService(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ClServiceController.name}.updateClService -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getClService = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ClServiceController.name}.getClService -- start`);
      const result = await this.clServiceService.getClService(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ClServiceController.name}.getClService -- start`);
    } catch (error) {
      next(error);
    }
  };

  public getClServices = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ClServiceController.name}.getClServices -- start`);
      const result = await this.clServiceService.getClServices();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ClServiceController.name}.getClServices -- start`);
    } catch (error) {
      next(error);
    }
  };

  public deleteClService = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ClServiceController.name}.deleteClService -- start`);
      const result = await this.clServiceService.deleteClService(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ClServiceController.name}.deleteClService -- success`);
    } catch (err) {
      next(err);
    }
  };
}

export default ClServiceController;

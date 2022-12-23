import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import TariffService from "../services/tariff.service";
import { constants } from "http2";

class TariffController {
  private readonly tariffService: TariffService;

  constructor() {
    this.tariffService = new TariffService();
  }

  public createTariff = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${TariffController.name}.createTariff -- start`);
      const result = await this.tariffService.createTariff(request);
      logger.debug(`${TariffController.name}.createTariff -- success`);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
    } catch (error) {
      next(error);
    }
  }

  public getTariffs = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${TariffController.name}.getTariffs -- start`);
      const result = await this.tariffService.getTariffs();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${TariffController.name}.getTariffs -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getTariff = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${TariffController.name}.getTariff -- start`);
      const result = await this.tariffService.getTariff(request);
      logger.debug(`${TariffController.name}.getTariff -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }

  public updateTariff = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${TariffController.name}.updateTariff -- start`);
      const result = await this.tariffService.updateTariff(request);
      logger.debug(`${TariffController.name}.updateTariff -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }

  public deleteTariff = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${TariffController.name}.deleteTariff -- start`);
      const result = await this.tariffService.deleteTariff(request)
      logger.debug(`${TariffController.name}.deleteTariff -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default TariffController;

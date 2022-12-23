import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import CityService from "../services/city.service";

class CityController {
  private readonly cityService: CityService;

  constructor() {
    this.cityService = new CityService();
  }

  public createCity = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CityController.name}.createCity -- start`);
      const result = await this.cityService.createCity(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${CityController.name}.createCity -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updateCity = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CityController.name}.updateCity -- start`);
      const result = await this.cityService.updateCity(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CityController.name}.updateCity -- success`);
    } catch (error) {
      next(error);
    }
  };

  public deleteCity = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CityController.name}.deleteCity -- start`);
      const result = await this.cityService.deleteCity(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CityController.name}.deleteCity -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCity = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CityController.name}.getCity -- start`);
      const result = await this.cityService.getCity(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CityController.name}.getCity -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCitiesByCountry = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CityController.name}.getCitiesByCountry -- start`);
      const result = await this.cityService.getCitiesByCountry(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CityController.name}.getCitiesByCountry -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCities = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CityController.name}.getCities -- start`);
      const result = await this.cityService.getCities();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CityController.name}.getCities -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default CityController;

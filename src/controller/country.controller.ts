import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import CountryService from "../services/country.service";
import { Multer } from "../config/multer.config";
class CountryController {
  private readonly countryService: CountryService;

  constructor() {
    this.countryService = new CountryService();
  }

  public createCountry = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryController.name}.createCountry -- start`);
      const result = await this.countryService.createCountry(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${CountryController.name}.createCountry -- success`);
    } catch (error) {
      if (request.file) await new Multer().removeFile(request.file);
      next(error);
    }
  };

  public updateCountry = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryController.name}.updateCountry -- start`);
      const result = await this.countryService.updateCountry(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CountryController.name}.updateCountry -- success`);
    } catch (error) {
      if (request.file) await new Multer().removeFile(request.file);
      next(error);
    }
  };

  public deleteCountry = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryController.name}.deleteCountry -- start`);
      const result = await this.countryService.deleteCountry(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CountryController.name}.deleteCountry -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCountry = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryController.name}.getCountry -- start`);
      const result = await this.countryService.getCountry(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CountryController.name}.getCountry -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCountries = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryController.name}.getCountries -- start`);
      const result = await this.countryService.getCountries();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CountryController.name}.getCountries -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default CountryController;

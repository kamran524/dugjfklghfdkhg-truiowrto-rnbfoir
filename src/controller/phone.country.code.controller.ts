import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import CountryCodeService from "../services/phone.country.code.service";

class CountryCodeController {
  private readonly countryCodeService: CountryCodeService;

  constructor() {
    this.countryCodeService = new CountryCodeService();
  }

  public createCountryCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryCodeController.name}.createCountryCode -- start`);
      const result = await this.countryCodeService.createCountryCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CountryCodeController.name}.createCountryCode -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public updateCountryCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryCodeController.name}.updateCountryCode -- start`);
      const result = await this.countryCodeService.updateCountryCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CountryCodeController.name}.updateCountryCode -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public deleteCountryCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryCodeController.name}.deleteCountryCode -- start`);
      const result = await this.countryCodeService.deleteCountryCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CountryCodeController.name}.deleteCountryCode -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public getCountryCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryCodeController.name}.getCountryCode -- start`);
      const result = await this.countryCodeService.getCountryCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CountryCodeController.name}.getCountryCode -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCountryCodes = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CountryCodeController.name}.getCountryCodes -- start`);
      const result = await this.countryCodeService.getCountryCodes();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CountryCodeController.name}.getCountryCodes -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default CountryCodeController;

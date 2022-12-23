import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import DistrictService from "../services/district.service";

class DistrictController {
  private readonly districtService: DistrictService;

  constructor() {
    this.districtService = new DistrictService();
  }

  public createDistrict = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${DistrictController.name}.createDistrict -- start`);
      const result = await this.districtService.createDistrict(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${DistrictController.name}.createDistrict -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updateDistrict = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${DistrictController.name}.updateDistrict -- start`);
      const result = await this.districtService.updateDistrict(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${DistrictController.name}.updateDistrict -- success`);
    } catch (error) {
      next(error);
    }
  };

  public deleteDistrict = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${DistrictController.name}.deleteDistrict -- start`);
      const result = await this.districtService.deleteDistrict(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${DistrictController.name}.deleteDistrict -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getDistrict = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${DistrictController.name}.getDistrict -- start`);
      const result = await this.districtService.getDistrict(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${DistrictController.name}.getDistrict -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getDistrictsByCity = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${DistrictController.name}.getDistrictsByCityName -- start`
      );
      const result = await this.districtService.getDistrictsByCity(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${DistrictController.name}.getDistrictsByCityName -- success`
      );
    } catch (error) {
      next(error);
    }
  };

  public getDistricts = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${DistrictController.name}.getDistricts -- start`);
      const result = await this.districtService.getDistricts();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${DistrictController.name}.getDistricts -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default DistrictController;

import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import AddressService from "../services/address.service";

class AddressController {
  private readonly addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  public createAddress = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AddressController.name}.createAddress -- start`);
      const result = await this.addressService.createAddress(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${AddressController.name}.createAddress -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updateAddress = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AddressController.name}.updateAddress -- start`);
      const result = await this.addressService.updateAddress(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${AddressController.name}.updateAddress -- success`);
    } catch (error) {
      next(error);
    }
  };

  public deleteAddress = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AddressController.name}.deleteAddress -- start`);
      const result = await this.addressService.deleteAddress(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${AddressController.name}.deleteAddress -- success`);
    } catch (error) {
      next(error);
    }
  };

  public modifyAddressStatus = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AddressController.name}.modifyAddressStatus -- start`);
      const result = await this.addressService.changeAddressStatus(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${AddressController.name}.modifyAddressStatus -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getAddress = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AddressController.name}.getAddress -- start`);
      const result = await this.addressService.getAddress(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${AddressController.name}.getAddress -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getAddresses = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${AddressController.name}.getAddresses -- start`);
      const result = await this.addressService.getAddresses();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${AddressController.name}.getAddresses -- success`);
    } catch (error) {
      next(error);
    }
  };
}



export default AddressController;

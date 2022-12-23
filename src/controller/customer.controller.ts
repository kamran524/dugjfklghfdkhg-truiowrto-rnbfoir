import { NextFunction, Request, Response } from "express";
import CustomerService from "../services/customer.service";
import logger from "../log/winston/index";
import { constants } from "http2";

class CustomerController {
  private readonly customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  public createCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerController.name}.createCustomer -- start`);
      const result = await this.customerService.createCustomer(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CustomerController.name}.createNewCustomer -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updateCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerController.name}.updateCustomer -- start`);
      const result = await this.customerService.updateCustomer(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CustomerController.name}.updateCustomer -- success`);
    } catch (error) {
      next(error);
    }
  };

  public deleteCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerController.name}.deleteCustomer -- start`);
      const result = await this.customerService.deleteCustomer(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CustomerController.name}.deleteCustomer -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerController.name}.getCustomer -- start`);
      const result = await this.customerService.getCustomer(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CustomerController.name}.getCustomer -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCustomers = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerController.name}.getCustomers -- start`);
      const result = await this.customerService.getCustomers();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${CustomerController.name}.getCustomers -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;

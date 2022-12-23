import { Request, Response, NextFunction } from "express";
import { constants } from "http2";
import logger from "../log/winston";
import { CustomerBalanceService } from "../services/customer.balance.service";

export class CustomerBalanceController {
  private readonly customerBalanceService: CustomerBalanceService;

  constructor() {
    this.customerBalanceService = new CustomerBalanceService();
  }

  public createNewCustomerBalance = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerBalanceController.name}.createNewCustomerBalance -- start`);
      const customerBalance = await this.customerBalanceService.createCustomerBalance(request);
      response.status(constants.HTTP_STATUS_CREATED).send(customerBalance);
      logger.debug(`${CustomerBalanceController.name}.createNewCustomerBalance -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getCustomerBalances = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerBalanceController.name}.getCustomersBalance -- start`);
      const result = await this.customerBalanceService.getCustomerBalances();
      logger.debug(`${CustomerBalanceController.name}.getCustomersBalance -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getCustomerBalance = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerBalanceController.name}.getCustomerBalance -- start`);
      const result = await this.customerBalanceService.getCustomerBalance(request);
      logger.debug(`${CustomerBalanceController.name}.getCustomerBalance -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result)
    } catch (error) {
      next(error);
    }
  };

  public updateCustomerBalance = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerBalanceController.name}.updateCustomerBalance -- start`);
      const result = await this.customerBalanceService.updateCustomerBalance(request);
      logger.debug(`${CustomerBalanceController.name}.updateCustomerBalance -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }

  public deleteCustomerBalance = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${CustomerBalanceController.name}.deleteCustomerBalance -- start`);
      const result = await this.customerBalanceService.deleteCustomerBalance(request);
      logger.debug(`${CustomerBalanceController.name}.deleteCustomerBalance -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { constants } from "http2";
import logger from "../log/winston";
import { OrderService } from "../services/order.service";

export class OrderController {
  private readonly orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public createNewOrder = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OrderController.name}.createNewOrder -- start`);
      const order = await this.orderService.createOrder(request);
      response.status(constants.HTTP_STATUS_CREATED).send(order);
      logger.debug(`${OrderController.name}.createNewOrder -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getOrders = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OrderController.name}.getOrders -- start`);
      const result = await this.orderService.getOrders();
      logger.debug(`${OrderController.name}.getOrders -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getOrder = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OrderController.name}.getOrder -- start`);
      const result = await this.orderService.getOrder(request);
      logger.debug(`${OrderController.name}.getOrder -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result)
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OrderController.name}.updateOrder -- start`);
      const result = await this.orderService.updateOrder(request);
      logger.debug(`${OrderController.name}.updateOrder -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }

  public deleteOrder = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${OrderController.name}.deleteOrder -- start`);
      const result = await this.orderService.deleteOrder(request);
      logger.debug(`${OrderController.name}.deleteOrder -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }
}

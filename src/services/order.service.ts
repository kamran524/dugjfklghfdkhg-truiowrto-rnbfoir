import { Request } from "express";
import { ApiError } from "../errors/api.error";
import OrderHelper from "../helper/order.helper";
import logger from "../log/winston";
import { OrderRepository } from "../repository/order.repository";

export class OrderService {
  private readonly orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async createOrder(request: Request) {
    logger.debug(`${OrderService.name}.createOrder -- start`);
    const order = await this.orderRepository.createOrder(request.body);
    logger.debug(`${OrderService.name}.createOrder -- success`);
    return order;
  }

  public async getOrders() {
    logger.debug(`${OrderService.name}.getOrders -- start`);
    const orders = await this.orderRepository.findOrders();
    if (!orders || orders.length == 0) {
      logger.error(`${OrderService.name}.getOrders -- no content`)
      throw ApiError.NotFoundException("No orders found!")
    }
    let data: OrderHelper[] = []
    for (const key in orders) data.push(new OrderHelper(orders[key]));
    logger.debug(`${OrderService.name}.getOrders -- success`);
    return data;
  }

  public async getOrder(request: Request) {
    logger.debug(`${OrderService.name}.getOrder -- start`);
    const { id } = request.params;
    const order = await this.orderRepository.findOrderById(id);
    if (!order) {
      logger.error(`${OrderService.name}.getOrder -- not found`);
      throw ApiError.NotFoundException(`Order with id ${id} not found!`);
    }
    const data = new OrderHelper(order);
    logger.debug(`${OrderService.name}.getOrder -- success`);
    return data;
  }

  public async updateOrder(request: Request) {
    logger.debug(`${OrderService.name}.updateOrder -- start`);
    const { id } = request.body;
    const result = await this.orderRepository.findOrderByIdAndUpdate(
      id,
      request.body
    );
    if (result.matchedCount == 0) {
      logger.error(`${OrderService.name}.updateOrder -- not found`);
      throw ApiError.NotFoundException(`Order with id ${id} not found!`);
    } else if (result.matchedCount == 0 && result.modifiedCount == 0) {
      logger.error(`${OrderService.name}.updateOrder -- not updated`);
      throw ApiError.ServiceUnavailableException("Order could not be updated!");
    }
    logger.debug(`${OrderService.name}.updateOrder -- success`);
    return result;
  }

  public async deleteOrder(request: Request) {
    logger.debug(`${OrderService.name}.deleteOrder -- start`);
    const { id } = request.params;
    const result = await this.orderRepository.findOrderByIdAndDelete(id);
    if (!result.acknowledged) {
      logger.error(`${OrderService.name}.deleteOrder -- not deleted`);
      throw ApiError.ServiceUnavailableException("Order could not be deleted!");
    } else if (result.deletedCount == 0) {
      logger.debug(`${OrderService.name}.deleteOrder -- not found`);
      throw ApiError.NotFoundException(`Order with id ${id} not found!`);
    }
    logger.debug(`${OrderService.name}.deleteOrder -- success`);
    return result;
  }
}

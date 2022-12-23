import { OrderModel } from "../models/order.model";
import { IOrder } from "../models/interfaces/order.interface";
import logger from "../log/winston";

export class OrderRepository {
  constructor() {
  }

  public async createOrder(data: IOrder) {
    logger.debug(`${OrderRepository.name}.createOrder -- start`);
    const result = await OrderModel.create(data);
    logger.debug(`${OrderRepository.name}.createOrder -- success`);
    return result;
  }

  public async findOrders() {
    logger.debug(`${OrderRepository.name}.findOrders -- start`);
    const orders = await OrderModel.find({}).lean();
    logger.debug(`${OrderRepository.name}.findOrders -- success`);
    return orders;
  }

  public async findOrderById(id: string) {
      logger.debug(`${OrderRepository.name}.findOrders -- start`);
      const order = await OrderModel.findById(id)
        .populate({
          path: "customerID",
          select: ["customerCode", "firstName", "lastName"],
        })
        .populate({
          path: "localBranchID",
          select: ["name"],
        })
      logger.debug(`${OrderRepository.name}.findOrders -- success`);
      return order;
  }

  public async findOrderByIdAndUpdate(id: string, body: IOrder) {
    logger.debug(`${OrderRepository.name}.findOrderByIdAndUpdate -- start`);
    const updatedOrder = await OrderModel.updateOne({ _id: id }, body);
    logger.debug(`${OrderRepository.name}.findOrderByIdAndUpdate -- success`);
    return updatedOrder;
  }

  public async findOrderByIdAndDelete(id: string) {
    logger.debug(`${OrderRepository.name}.findOrderByIdAndDelete -- start`);
    const deletedOrder = await OrderModel.deleteOne({ _id: id });
    logger.debug(`${OrderRepository.name}.findOrderByIdAndDelete -- success`);
    return deletedOrder;
  }
}

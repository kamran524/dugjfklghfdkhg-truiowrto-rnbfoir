import { Router } from "express";
import { OrderController } from "../../controller/order.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { OrderDto, OrderUpdateDto } from "../../dto/order";
import { ENUMS } from "../../enum/enums";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class OrderRouter {
  path: string;
  private readonly router: Router;
  private readonly orderController: OrderController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/order";
    this.router = Router();
    this.validation = new ValidationMiddleware();
    this.orderController = new OrderController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validation.check(OrderDto, ENUMS.REQUEST_OBJECTS.BODY, false, true),
      this.orderController.createNewOrder
    );
    this.router.get(`${this.path}`, this.orderController.getOrders);
    this.router.get(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.orderController.getOrder
    );
    this.router.patch(
      `${this.path}`,
      this.validation.check(
        OrderUpdateDto,
        ENUMS.REQUEST_OBJECTS.BODY,
        false,
        false
      ),
      this.orderController.updateOrder
    );
    this.router.delete(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.orderController.deleteOrder
    );
  }
}

export default OrderRouter;

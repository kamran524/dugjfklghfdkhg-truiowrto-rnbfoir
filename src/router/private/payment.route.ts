import { Router } from "express";
import { PaymentController } from "../../controller/payment.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { ENUMS } from "../../enum/enums";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class PaymentRouter {
  path: string;
  private readonly router: Router;
  private readonly orderController: PaymentController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/payment";
    this.router = Router();
    this.validation = new ValidationMiddleware();
    this.orderController = new PaymentController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/condition`,
      this.orderController.paymentCondition
    );
    this.router.post(
      `${this.path}/test`,
      this.orderController.test
    );
  }
}

export default PaymentRouter;

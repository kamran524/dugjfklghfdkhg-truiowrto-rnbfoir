import { Router } from "express";
import { CustomerBalanceController } from "../../controller/customer.balance.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import {CreateCustomerBalanceDto} from "../../dto/customer.balance/create.customer.balance.dto";
import {UpdateCustomerBalanceDto} from "../../dto/customer.balance/update.customer.balance.dto";
import { ENUMS } from "../../enum/enums";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class CustomerBalanceRouter {
  path: string;
  private readonly router: Router;
  private readonly customerBalanceController: CustomerBalanceController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/customer/balance";
    this.router = Router();
    this.validation = new ValidationMiddleware();
    this.customerBalanceController = new CustomerBalanceController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validation.check(CreateCustomerBalanceDto, ENUMS.REQUEST_OBJECTS.BODY, false, true),
      this.customerBalanceController.createNewCustomerBalance
    );
    this.router.get(`${this.path}`, this.customerBalanceController.getCustomerBalances);
    this.router.get(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.customerBalanceController.getCustomerBalance
    );
    this.router.patch(
      `${this.path}`,
      this.validation.check(
        UpdateCustomerBalanceDto,
        ENUMS.REQUEST_OBJECTS.BODY,
        false,
        false
      ),
      this.customerBalanceController.updateCustomerBalance
    );
    this.router.delete(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.customerBalanceController.deleteCustomerBalance
    );
  }
}

export default CustomerBalanceRouter;

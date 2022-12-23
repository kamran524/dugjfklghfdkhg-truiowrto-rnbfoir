import { Router } from "express";
import { ENUMS } from "../../enum/enums";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import AuthController from "../../controller/auth.controller";
import { CreateCustomerDto } from "../../dto/customer/create.customer.dto";
import { LogInDto } from "../../dto/auth/login.dto";
import authMiddleware from "../../middlewares/auth.middleware";
import refreshMiddleware from "../../middlewares/refresh.middleware";
import { VerifyMailDto } from "../../dto/auth/verify.dto";

class AuthRoute {
  private readonly path: string;
  private readonly router: Router;
  private readonly authController: AuthController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/auth";
    this.router = Router();
    this.authController = new AuthController();
    this.validation = new ValidationMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      this.validation.check(CreateCustomerDto, ENUMS.REQUEST_OBJECTS.BODY),
      this.authController.SignUp
    );
    this.router.post(
      `${this.path}/login`,
      this.validation.check(LogInDto, ENUMS.REQUEST_OBJECTS.BODY),
      this.authController.LogIn
    );
    this.router.post(
      `${this.path}/verify/:verifyToken`,
      this.validation.check(VerifyMailDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.authController.VerifyMail
    );
    this.router.post(
      `${this.path}/logout`,
      authMiddleware,
      refreshMiddleware,
      this.authController.LogOut
    );
  }
}

export default AuthRoute;

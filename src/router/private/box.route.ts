import { Router } from "express";
import BoxController from "../../controller/box.controller";
import { ENUMS } from "../../enum/enums";
import { BoxDto, BoxUpdateDto } from "../../dto/box";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class BoxRoute {
  private readonly path: string;
  private readonly router: Router;
  private readonly boxController: BoxController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/box";
    this.router = Router();
    this.boxController = new BoxController();
    this.validation = new ValidationMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validation.check(BoxDto, ENUMS.REQUEST_OBJECTS.BODY, false, true),
      this.boxController.createBox
    );
    this.router.get(`${this.path}`, this.boxController.getBoxes);
    this.router.get(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.boxController.getBox
    );
    this.router.patch(
      `${this.path}`,
      this.validation.check(BoxUpdateDto, ENUMS.REQUEST_OBJECTS.BODY, false, false),
      this.boxController.updateBox
    )
    this.router.delete(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.boxController.deleteBox
    )
  }
}

export default BoxRoute;

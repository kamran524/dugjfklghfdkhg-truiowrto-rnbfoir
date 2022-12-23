import { Router } from "express";
import TariffController from "../../controller/tariffs.controller";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import { CreateTariffDto, UpdateTariffDto } from "../../dto/tariffs";
import { ENUMS } from "../../enum/enums";
import { ParamIdDto } from "../../dto/common/param.id.dto";

class TariffRoute {
  private readonly path: string;
  private readonly router: Router;
  private readonly tariffController: TariffController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/tariff";
    this.router = Router();
    this.tariffController = new TariffController();
    this.validation = new ValidationMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.validation.check(CreateTariffDto, ENUMS.REQUEST_OBJECTS.BODY, false, true), this.tariffController.createTariff);
    this.router.get(`${this.path}`, this.tariffController.getTariffs);
    this.router.get(`${this.path}/:id`, this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS), this.tariffController.getTariff);
    this.router.patch(`${this.path}`, this.validation.check(UpdateTariffDto, ENUMS.REQUEST_OBJECTS.BODY, false, false), this.tariffController.updateTariff);
    this.router.patch(`${this.path}/:id`, this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS), this.tariffController.deleteTariff);
  }
}

export default TariffRoute;

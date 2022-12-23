import { Router } from "express";
import FlightController from "../../controller/flight.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { FlightDto, FlightUpdateDto } from "../../dto/flight";
import { ENUMS } from "../../enum/enums";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class FlightRoute {
  path: string;
  private readonly router: Router;
  private readonly flightController: FlightController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/flight";
    this.router = Router();
    this.flightController = new FlightController();
    this.validation = new ValidationMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validation.check(FlightDto, ENUMS.REQUEST_OBJECTS.BODY, false, true),
      this.flightController.createFlight
    );
    this.router.get(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.flightController.getFlight
    );
    this.router.get(`${this.path}`, this.flightController.getFlights);
    this.router.patch(
      `${this.path}`,
      this.validation.check(
        FlightUpdateDto,
        ENUMS.REQUEST_OBJECTS.BODY,
        false,
        false
      ),
      this.flightController.updateFlight
    );
    this.router.delete(
      `${this.path}/:id`,
      this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS),
      this.flightController.deleteFlight
    );
  }
}

export default FlightRoute;

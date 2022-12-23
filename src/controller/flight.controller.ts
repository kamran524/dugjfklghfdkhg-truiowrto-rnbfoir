import { Request, Response, NextFunction } from "express";
import FlightService from "../services/flight.service";
import logger from "../log/winston";
import { constants } from "http2";

class FlightController {
  private readonly flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  public createFlight = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${FlightController.name}.createFlight -- start`);
      const result = await this.flightService.createFlight(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${FlightController.name}.createFlight -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getFlight = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${FlightController.name}.getFlight -- start`);
      const result = await this.flightService.getFlight(request);
      logger.debug(`${FlightController.name}.getFlight -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getFlights = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${FlightController.name}.getFlights -- start`);
      const result = await this.flightService.getFlights();
      logger.debug(`${FlightController.name}.getFlights -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public updateFlight = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${FlightController.name}.updateFlight -- start`);
      const result = await this.flightService.updateFlight(request);
      logger.debug(`${FlightController.name}.updateFlight -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteFlight = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${FlightController.name}.deletFlight -- start`);
      const result = await this.flightService.deleteFlight(request);
      logger.debug(`${FlightController.name}.deletFlight -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default FlightController;

import { Request } from "express";
import { ApiError } from "../errors/api.error";
import FlightHelper from "../helper/flight.helper";
import logger from "../log/winston";
import FlightRepository from "../repository/flight.repository";

class FlightService {
  private readonly flightRepository: FlightRepository;

  constructor() {
    this.flightRepository = new FlightRepository();
  }

  public async createFlight(request: Request) {
    logger.debug(`${FlightService.name}.createFlight -- start`);
    const result = await this.flightRepository.createFlight(request.body);
    logger.debug(`${FlightService.name}.createFlight -- success`);
    return result;
  }

  public async getFlight(request: Request) {
    logger.debug(`${FlightService.name}.getFlight -- start`);
    const { id } = request.params;
    const result = await this.flightRepository.findFlightById(id);
    if (!result) {
      logger.error(`${FlightService.name}.getFlight -- not found`);
      throw ApiError.NotFoundException(`Flight with id ${id} not found!`);
    }
    const data = new FlightHelper(result);
    logger.debug(`${FlightService.name}.getFlight -- success`);
    return data;
  }

  public async getFlights() {
    logger.debug(`${FlightService.name}.getFlights -- start`);
    const result = await this.flightRepository.findFlights();
    if (!result) {
      logger.error(`${FlightService.name}.getFlights -- no content`)
      throw ApiError.NoContentException("No flight found!")
    }
    let data: FlightHelper[] = [];
    for (const key in result) data.push(new FlightHelper(result[key]));
    logger.debug(`${FlightService.name}.getFlights -- success`);
    return result;
  }

  public async updateFlight(request: Request) {
    logger.debug(`${FlightService.name}.updateFlight -- start`);
    const { id } = request.body;
    const result = await this.flightRepository.findFlightByIdAndUpdate(
      id,
      request.body
    );
    if (result.matchedCount == 0) {
      logger.error(`${FlightService.name}.updateFlight -- not found`);
      throw ApiError.NotFoundException(`Flight with id ${id} not found!`);
    } else if (result.modifiedCount == 0) {
      logger.error(`${FlightService.name}.updateFlight -- not updated`);
      throw ApiError.ServiceUnavailableException("Flight could not be updated!");
    }
    logger.debug(`${FlightService.name}.updateFlight -- success`);
    return result;
  }

  public async deleteFlight(request: Request) {
    logger.debug(`${FlightService.name}.deleteFlight -- start`);
    const { id } = request.params;
    const result = await this.flightRepository.findFlightByIdAndDelete(id);
    if (!result.acknowledged) {
      logger.error(`${FlightService.name}.deleteFlight -- not deleted`);
      throw ApiError.ServiceUnavailableException("Flight could not be deleted!");
    } else if (result.deletedCount == 0) {
      logger.debug(`${FlightService.name}.deleteFlight -- not found`);
      throw ApiError.NotFoundException(`Flight with id ${id} not found!`);
    }
    logger.debug(`${FlightService.name}.deleteFlight -- success`);
    return result;
  }
}

export default FlightService;

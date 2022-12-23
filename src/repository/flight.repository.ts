import logger from "../log/winston";
import { FlightModel } from "../models/flight.model";
import { IFlight } from "../models/interfaces/flight.interface";

class FlightRepository {
  constructor() {}

  public async createFlight(data: IFlight) {
    logger.debug(`${FlightRepository.name}.createFlight -- start`);
    const result = await FlightModel.create(data);
    logger.debug(`${FlightRepository.name}.createFlight -- success`);
    return result;
  }

  public async findFlightById(id: string) {
    logger.debug(`${FlightRepository.name}.findFlightById -- start`);
    const result = await FlightModel.findById(id);
    logger.debug(`${FlightRepository.name}.findFlightById -- success`);
    return result;
  }

  public async findFlights() {
    logger.debug(`${FlightRepository.name}.findFlights -- start`);
    const result = await FlightModel.find().lean();
    logger.debug(`${FlightRepository.name}.findFlights -- success`);
    return result;
  }

  public async findFlightByIdAndUpdate(id: string, body: IFlight) {
    logger.debug(`${FlightRepository.name}.findFlightByIdAndUpdate -- start`);
    const result = await FlightModel.updateOne({ _id: id }, body);
    logger.debug(`${FlightRepository.name}.findFlightByIdAndUpdate -- success`);
    return result;
  }

  public async findFlightByIdAndDelete(id: string) {
    logger.debug(`${FlightRepository.name}.findFlightByIdAndDelete -- start`);
    const result = await FlightModel.deleteOne({ _id: id });
    logger.debug(`${FlightRepository.name}.findFlightByIdAndDelete -- success`);
    return result;
  }
}

export default FlightRepository;

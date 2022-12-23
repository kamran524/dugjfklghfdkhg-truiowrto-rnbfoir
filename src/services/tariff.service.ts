import logger from "../log/winston";
import TariffRepository from "../repository/tariff.repository";
import { ApiError } from "../errors/api.error";
import TariffHelper from "../helper/tariffs.helper";
import { Request } from "express";

class TariffService {
  private readonly tariffRepository: TariffRepository;

  constructor() {
    this.tariffRepository = new TariffRepository();
  }

  public async createTariff(request: Request) {
    logger.debug(`${TariffService.name}.createTariff -- start`);
    const result = await this.tariffRepository.createTariff(request.body);
    logger.debug(`${TariffService.name}.createTariff -- success`);
    return result;
  }

  public async getTariffs() {
    logger.debug(`${TariffService.name}.getTariffs -- start`);
    const tariffs = await this.tariffRepository.getTariffs();
    if (!tariffs || tariffs.length == 0) {
      logger.error(`${TariffService.name}.getTariffs -- no content`);
      throw ApiError.NoContentException("No tariff found!");
    }
    let result: TariffHelper[] = [];
    for (let key in tariffs) result.push(new TariffHelper(tariffs[key]));
    logger.debug(`${TariffService.name}.getTariffs -- success`);
    return result;
  }

  public async getTariff(request: Request) {
    logger.debug(`${TariffService.name}.getTariff -- start`);
    const { id } = request.params;
    const tariff = await this.tariffRepository.findTariffById(id);
    if (!tariff) {
      logger.error(`${TariffService.name}.getTariff -- not found`);
      throw ApiError.NotFoundException(`Tariff with id ${id} not found!`);
    }
    const result = new TariffHelper(tariff);
    logger.debug(`${TariffService.name}.getTariff -- success`);
    return result;
  }

  public async updateTariff(request: Request) {
    logger.debug(`${TariffService.name}.updateTariff -- success`);
    const { id } = request.body;
    const result = await this.tariffRepository.findTariffByIdAndUpdate(id, request.body);
    if (result.matchedCount == 0) {
      logger.error(`${TariffService.name}.updateTariff -- not found`);
      throw ApiError.NotFoundException(`Tariff with id ${id} not found!`);
    } else if (result.modifiedCount == 0) {
      logger.error(`${TariffService.name}.updateTariff -- not updated`);
      throw ApiError.ServiceUnavailableException("Tariff could not be updated!");
    }
    logger.debug(`${TariffService.name}.updateTariff -- success`);
    return result;
  }

  public async deleteTariff(request: Request) {
    logger.debug(`${TariffService.name}.deleteTariff -- start`);
    const { id } = request.params;
    const result = await this.tariffRepository.deleteTariff(id);
    if (result.matchedCount == 0) {
      logger.error(`${TariffService.name}.deleteTariff -- not found`);
      throw ApiError.NotFoundException(`Tariff with id ${id} not found!`);
    } else if (result.modifiedCount == 0) {
      logger.error(`${TariffService.name}.deleteTariff -- not updated`);
      throw ApiError.ServiceUnavailableException("Tariff could not be deleted!");
    }
    logger.debug(`${TariffService.name}.deleteTariff -- success`);
    return result;
  }
}

export default TariffService;

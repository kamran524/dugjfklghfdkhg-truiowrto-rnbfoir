import logger from "../log/winston";
import { TariffModel } from "../models/tariffs.model";
import { ITariff } from "../models/interfaces/tariff.interface";

class TariffRepository {
  constructor() {
  }

  public async createTariff(body: ITariff) {
    logger.debug(`${TariffRepository.name}.createTariff -- start`);
    const tariff = await TariffModel.create(body);
    logger.debug(`${TariffRepository.name}.createTariff -- success`);
    return tariff;
  }

  public async getTariffs() {
    logger.debug(`${TariffRepository.name}.getTariffs -- start`);
    const tariffs = await TariffModel.find({}).lean();
    logger.debug(`${TariffRepository.name}.getTariffs -- success`);
    return tariffs;
  }

  public async findTariffById(id: string) {
    logger.debug(`${TariffRepository.name}.findTariffById -- start`);
    const tariff = await TariffModel.findById(id);
    logger.debug(`${TariffRepository.name}.findTariffById -- success`);
    return tariff;
  }

  public async findTariffByIdAndUpdate(id: string, body: ITariff) {
    logger.debug(`${TariffRepository.name}.findTariffByIdAndUpdate -- start`);
    const tariff = await TariffModel.updateOne({ _id: id }, body);
    logger.debug(`${TariffRepository.name}.findTariffByIdAndUpdate -- success`);
    return tariff;
  }

  public async deleteTariff(id: string) {
    logger.debug(`${TariffRepository.name}.deleteTariff -- start`);
    const tariff = await TariffModel.updateOne({ _id: id }, { status: false });
    logger.debug(`${TariffRepository.name}.deleteTariff -- start`);
    return tariff;
  }
}

export default TariffRepository;

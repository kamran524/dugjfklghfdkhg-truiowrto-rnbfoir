import { BoxModel } from "../models/box.model";
import logger from "../log/winston";
import { IBox } from "../models/interfaces/box.interface";

class BoxRepository {
  constructor() {}

  public async createBox(body: IBox) {
    logger.debug(`${BoxRepository.name}.createBox -- start`);
    const box = await BoxModel.create(body);
    logger.debug(`${BoxRepository.name}.createBox -- success`);
    return box;
  }

  public async findBoxes() {
    logger.debug(`${BoxRepository.name}.findBoxes -- start`);
    const boxes = await BoxModel.find({}).lean();
    logger.debug(`${BoxRepository.name}.findBoxes -- success`);
    return boxes;
  }

  public async findBoxById(id: string) {
    logger.debug(`${BoxRepository.name}.findBoxById -- start`);
    const box = await BoxModel.findById(id);
    logger.debug(`${BoxRepository.name}.findBoxById -- success`);
    return box;
  }

  public async findBoxByBarcode(barcode: IBox["barcode"]) {
    logger.debug(`${BoxRepository.name}.findBoxByBarcode -- start`);
    const box = await BoxModel.find({ barcode });
    logger.debug(`${BoxRepository.name}.findBoxByBarcode -- success`);
    return box;
  }

  public async findBoxByIdAndUpdate(id: string, body: IBox) {
    logger.debug(`${BoxRepository.name}.findBoxByIdAndUpdate -- start`);
    const updatedBox = await BoxModel.updateOne({ _id: id }, body);
    logger.debug(`${BoxRepository.name}.findBoxByIdAndUpdate -- success`);
    return updatedBox;
  }

  public async findBoxByIdAndDelete(id: string) {
    logger.debug(`${BoxRepository.name}.findBoxByIdAndDelete -- start`);
    const deletedBox = await BoxModel.deleteOne({ _id: id });
    logger.debug(`${BoxRepository.name}.findBoxByIdAndDelete -- success`);
    return deletedBox;
  }
}

export default BoxRepository;

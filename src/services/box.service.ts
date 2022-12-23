import { Request } from "express";
import BoxRepository from "../repository/box.repository";
import logger from "../log/winston";
import { ApiError } from "../errors/api.error";
import BoxHelper from "../helper/box.helper";

class BoxService {
  private readonly boxRepository: BoxRepository;

  constructor() {
    this.boxRepository = new BoxRepository();
  }

  public async createBox(request: Request) {
    logger.debug(`${BoxService.name}.createBox -- start`);
    const { barcode } = request.body;
    const isBarcodeExists = (await this.boxRepository.findBoxByBarcode(barcode))
      ? true
      : false;
    if (isBarcodeExists) {
      logger.error(`${BoxService.name}.createBox -- duplicate key`);
      throw ApiError.ConflictException(
        `Barcode ${barcode} is already registered!`
      );
    }
    const result = await this.boxRepository.createBox(request.body);
    logger.debug(`${BoxService.name}.createBox -- success`);
    return result;
  }

  public async getBoxes() {
    logger.debug(`${BoxService.name}.getBoxes -- start`);
    const result = await this.boxRepository.findBoxes();
    if (!result) {
      logger.error(`${BoxService.name}.getBoxes -- no content`);
      throw ApiError.NoContentException("No content found!");
    }
    const data: BoxHelper[] = [];
    for (const key in result) data.push(new BoxHelper(result[key]));
    logger.debug(`${BoxService.name}.getBoxes -- success`);
    return result;
  }

  public async getBox(request: Request) {
    logger.debug(`${BoxService.name}.getBox -- start`);
    const { id } = request.params;
    const result = await this.boxRepository.findBoxById(id);
    if (!result) {
      logger.error(`${BoxService.name}.getBox -- not found`);
      throw ApiError.NotFoundException(`Box with id ${id} not found!`);
    }
    const data = new BoxHelper(result);
    logger.debug(`${BoxService.name}.getBox -- success`);
    return data;
  }

  public async updateBox(request: Request) {
    logger.debug(`${BoxService.name}.updateBox -- start`);
    const { id } = request.body;
    if (!id) {
      logger.error(`${BoxService.name} -- id not provided`);
      throw ApiError.BadRequest("ID is not provided!");
    }
    const result = await this.boxRepository.findBoxByIdAndUpdate(
      id,
      request.body
    );
    if (result.matchedCount == 0) {
      logger.error(`${BoxService.name}.updateBox -- not found`);
      throw ApiError.NotFoundException(`Box with id ${id} not found!`);
    } else if (result.modifiedCount == 0) {
      logger.error(`${BoxService.name}.updateBox -- not updated`);
      throw ApiError.ServiceUnavailableException("Box could not be updated!");
    }
    logger.debug(`${BoxService.name}.updateBox -- success`);
    return result;
  }

  public async deleteBox(request: Request) {
    logger.debug(`${BoxService.name}.deleteBox -- start`);
    const { id } = request.params;
    const result = await this.boxRepository.findBoxByIdAndDelete(id);
    if (!result.acknowledged) {
      logger.error(`${BoxService.name}.deleteBox -- not deleted`);
      throw ApiError.ServiceUnavailableException("Box could not be deleted!");
    } else if (result.deletedCount == 0) {
      logger.debug(`${BoxService.name}.deleteBox -- not found`);
      throw ApiError.NotFoundException(`Box with id ${id} not found!`);
    }
    logger.debug(`${BoxService.name}.deleteBox -- success`);
    return result;
  }
}

export default BoxService;

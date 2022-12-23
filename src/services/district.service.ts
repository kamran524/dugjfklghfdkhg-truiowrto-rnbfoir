import { Request } from "express";
import logger from "../log/winston";
import DistrictRepository from "../repository/district.repository";
import { isEmptyArray } from "../util/array.util";
import { ApiError } from "../errors/api.error";
import { DistrictHelper } from "../helper/district.helper";

class DistrictService {
  private readonly districtRepository: DistrictRepository;

  constructor() {
    this.districtRepository = new DistrictRepository();
  }

  public async createDistrict(request: Request) {
    logger.debug(`${DistrictService.name}.createDistrict -- start`);
    const result = await this.districtRepository.createDistrict(request.body);
    if (!result) {
      logger.warn(`${DistrictService.name}.createDistrict -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${DistrictService.name}.createDistrict -- success`);
    return result;
  }

  public async updateDistrict(request: Request) {
    logger.debug(`${DistrictService.name}.updateDistrict -- start`);
    const { id, name } = request.body;
    if (!id && !name) {
      logger.warn(`${DistrictService.name}.updateDistrict -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.districtRepository.updateDistrictById(id, name);
    if (!result.modifiedCount) {
      logger.warn(`${DistrictService.name}.updateDistrict -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount) {
      logger.warn(
        `${DistrictService.name}.updateDistrict -- NotFoundException`
      );
      throw ApiError.NotFoundException();
    }
    logger.debug(`${DistrictService.name}.updateDistrict -- success`);
    return result;
  }

  public async deleteDistrict(request: Request) {
    logger.debug(`${DistrictService.name}.deleteDistrict -- start`);
    const { id } = request.params;
    const result = await this.districtRepository.deleteDistrict(id);
    if (!result.modifiedCount) {
      logger.warn(`${DistrictService.name}.deleteDistrict -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount) {
      logger.warn(
        `${DistrictService.name}.deleteDistrict -- NotFoundException`
      );
      throw ApiError.NotFoundException();
    }
    logger.debug(`${DistrictService.name}.deleteDistrict -- success`);
    return result;
  }

  public async getDistrict(request: Request) {
    logger.debug(`${DistrictService.name}.getDistrict -- start`);
    const { id } = request.params;
    const result = await this.districtRepository.findDistrictById(id);
    if (!result) {
      logger.warn(`${DistrictService.name}.getDistrict -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new DistrictHelper(result);
    logger.debug(`${DistrictService.name}.getDistrict -- success`);
    return data;
  }

  public async getDistrictsByCity(request: Request) {
    logger.debug(`${DistrictService.name}.getDistrictsByCity -- start`);
    const { id } = request.params;
    const result = await this.districtRepository.findDistrictsByCityId(id);
    if (!isEmptyArray(result)) {
      logger.warn(
        `${DistrictService.name}.getDistrictsByCity -- NoContentException`
      );
      throw ApiError.NoContentException();
    }
    let data: DistrictHelper[] = [];
    for (const key in result) {
      data.push(new DistrictHelper(result[key]));
    }
    logger.debug(`${DistrictService.name}.getDistrictsByCity -- success`);
    return data;
  }

  public async getDistricts() {
    logger.debug(`${DistrictService.name}.getDistricts -- start`);
    const result = await this.districtRepository.findDistricts();
    if (!isEmptyArray(result)) {
      logger.warn(`${DistrictService.name}.getDistricts -- NoContentException`);
      throw ApiError.NoContentException();
    }
    let data: DistrictHelper[] = [];
    for (const key in result) {
      data.push(new DistrictHelper(result[key]));
    }
    logger.debug(`${DistrictService.name}.getDistricts -- success`);
    return data;
  }
}

export default DistrictService;

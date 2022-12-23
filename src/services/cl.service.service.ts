import { Request } from "express";
import { ApiError } from "../errors/api.error";
import ClServiceHelper from "../helper/cl.service.helper";
import logger from "../log/winston";
import ClServiceRepository from "../repository/cl.service.repository";

class ClServiceService {
  private readonly clServiceRepository: ClServiceRepository;

  constructor() {
    this.clServiceRepository = new ClServiceRepository();
  }

  public async createClService(request: Request) {
    logger.debug(`${ClServiceService.name}.createClService -- start`);
    const result = await this.clServiceRepository.createClService(request.body);
    logger.debug(`${ClServiceService.name}.createClService -- success`);
    return result;
  }

  public async updateClService(request: Request) {
    logger.debug(`${ClServiceService.name}.updateClService -- start`);
    const { id } = request.params;
    const result = await this.clServiceRepository.updateClServiceById(
      id,
      request.body
    );
    logger.debug(`${ClServiceService.name}.updateClService -- success`);
    return result;
  }

  public async deleteClService(request: Request) {
    logger.debug(`${ClServiceService.name}.deleteClService -- start`);
    const { id } = request.params;
    const result = await this.clServiceRepository.deleteClService(id);
    logger.debug(`${ClServiceService.name}.deleteClService -- success`);
    return result;
  }

  public async getClService(request: Request) {
    logger.debug(`${ClServiceService.name}.getClService -- start`);
    const { id } = request.params;
    const result = await this.clServiceRepository.findClServiceById(id);
    if (!result) {
      logger.error(`${ClServiceService.name}.getClService -- not found`);
      throw ApiError.NotFoundException(`ClService with id ${id} not found!`);
    }
    const data = new ClServiceHelper(result);
    logger.debug(`${ClServiceService.name}.getClService -- success`);
    return data;
  }

  public async getClServices() {
    logger.debug(`${ClServiceService.name}.getClServicees -- start`);
    const result = await this.clServiceRepository.findClServicees();
    if (!result || result.length === 0) {
      logger.error(`${ClServiceService.name}.getClServicees -- not content`);
      throw ApiError.NoContentException("No content found!");
    }
    const data: ClServiceHelper[] = [];
    for (const key in result) data.push(new ClServiceHelper(result[key]));
    logger.debug(`${ClServiceService.name}.getClServicees -- success`);
    return data;
  }
}

export default ClServiceService;
















/**
 *  title
 *  content
 *  image
 *  status
 *
 * */

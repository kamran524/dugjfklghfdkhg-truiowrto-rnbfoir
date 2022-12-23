import logger from "../log/winston";
import PrivilegeRepository from "../repository/privilege.repository";
import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { PrivilegeHelper } from "../helper/privilege.helper";

class PrivilegeService {
  private readonly privilegeRepository: PrivilegeRepository;

  constructor() {
    this.privilegeRepository = new PrivilegeRepository();
  }

  public async createPrivilege(request: Request) {
    logger.debug(`${PrivilegeService.name}.createPrivilege -- start`);
    const data = await this.privilegeRepository.createPrivilege(request.body);
    logger.debug(`${PrivilegeService.name}.createPrivilege -- success`);
    return data;
  }

  public async getPrivileges() {
    logger.debug(`${PrivilegeService.name}.getPrivileges -- start`);
    const data = await this.privilegeRepository.getPrivileges();
    if (!data || data.length === 0) {
      logger.debug(`${PrivilegeService.name}.getPrivileges -- no content`);
      throw ApiError.NoContentException("No privileges found!");
    }
    const result: PrivilegeHelper[] = [];
    for (const key in data) result.push(new PrivilegeHelper(data[key]));
    logger.debug(`${PrivilegeService.name}.getPrivileges -- success`);
    return result;
  }

  public async getPrivilege(request: Request) {
    logger.debug(`${PrivilegeService.name}.getPrivilege -- start`);
    const { id } = request.params;
    const data = await this.privilegeRepository.getPrivilege(id);
    if (!data) {
      logger.error(`${PrivilegeService.name}.getPrivilege -- not found`);
      throw ApiError.NotFoundException(`Privilege with id ${id} not found!`);
    }
    const result = new PrivilegeHelper(data);
    logger.debug(`${PrivilegeService.name}.getPrivilege -- success`);
    return result;
  }

  public async updatePrivilege(request: Request) {
    logger.debug(`${PrivilegeService.name}.updatePrivilege -- start`);
    const { id } = request.body;
    const data = await this.privilegeRepository.updatePrivilege(id, request.body);
    if (!data.modifiedCount){
      logger.warn(`${PrivilegeService.name}.updatePrivilege -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!data.matchedCount){
      logger.warn(`${PrivilegeService.name}.updatePrivilege -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${PrivilegeService.name}.updatePrivilege -- success`);
    return data;
  }

  public async deletePrivilege(request: Request) {
    logger.debug(`${PrivilegeService.name}.deletePrivilege -- start`);
    const { id } = request.params;
    const result = await this.privilegeRepository.deletePrivilege(id);
    if (!result.modifiedCount){
      logger.warn(`${PrivilegeService.name}.deletePrivilege -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${PrivilegeService.name}.deletePrivilege -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${PrivilegeService.name}.deletePrivilege -- success`);
    return result;
  }
}

export default PrivilegeService;

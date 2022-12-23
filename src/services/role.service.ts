import { Request } from "express";
import logger from "../log/winston";
import RoleRepository from "../repository/role.repository";
import { ApiError } from "../errors/api.error";
import { RoleHelper } from "../helper/role.helper";

class RoleService {
  private readonly roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public async createRole(request: Request) {
    logger.debug(`${RoleService.name}.createRole -- start`);
    const role = await this.roleRepository.createRole(request.body);
    logger.debug(`${RoleService.name}.createRole -- success`);
    return role;
  }

  public async getRoles() {
    logger.debug(`${RoleService.name}.getRoles -- start`);
    const data = await this.roleRepository.getRoles();
    if (!data || data.length === 0) {
      logger.error(`${RoleService.name}.getRoles -- no content`);
      throw ApiError.NoContentException("No roles found!");
    }
    const result: RoleHelper[] = [];
    for (const key in data) result.push(new RoleHelper(data[key]));
    logger.debug(`${RoleService.name}.getRoles -- success`);
    return result;
  }

  public async getRole(request: Request) {
    logger.debug(`${RoleService.name}.getRole -- start`);
    const { id } = request.params;
    const data = await this.roleRepository.getRole(id);
    if (!data) {
      logger.error(`${RoleService.name}.getRole - not found`);
      throw ApiError.NotFoundException(`Role with id ${id} not found!`);
    }
    const result = new RoleHelper(data);
    logger.debug(`${RoleService.name}.getRole -- success`);
    return result;
  }

  public async updateRole(request: Request) {
    logger.debug(`${RoleService.name}.updateRole -- start`);
    const { id } = request.body;
    const data = await this.roleRepository.updateRole(id, request.body);
    if (!data.matchedCount) {
      logger.warn(`${RoleService.name}.updateRole -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!data.matchedCount) {
      logger.warn(`${RoleService.name}.updateRole -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${RoleService.name}.updateRole -- success`);
    return data;
  };

  public async deleteRole(request: Request) {
    logger.debug(`${RoleService.name}.deleteRole -- start`);
    const { id } = request.params;
    const data = await this.roleRepository.deleteRole(id);
    if (!data.matchedCount) {
      logger.warn(`${RoleService.name}.deleteRole -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!data.matchedCount) {
      logger.warn(`${RoleService.name}.deleteRole -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${RoleService.name}.deleteRole -- success`);
    return data;
  }
}

export default RoleService;

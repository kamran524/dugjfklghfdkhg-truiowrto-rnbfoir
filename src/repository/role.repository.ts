import { IRole } from "../models/interfaces/role.interface";
import logger from "../log/winston";
import { RoleModel } from "../models/role.model";

class RoleRepository {
  constructor() {
  }

  public async createRole(body: IRole) {
    logger.debug(`${RoleRepository.name}.createRole -- start`);
    const role = await RoleModel.create(body);
    logger.debug(`${RoleRepository.name}.createRole -- success`);
    return role;
  }

  public async getRoles() {
    logger.debug(`${RoleRepository.name}.getRoles -- start`);
    const roles = await RoleModel.find({}).lean();
    logger.debug(`${RoleRepository.name}.getRoles -- success`);
    return roles;
  }

  public async getRole(id: string) {
    logger.debug(`${RoleRepository.name}.getRole -- start`);
    const role = await RoleModel.findById(id);
    logger.debug(`${RoleRepository.name}.getRole -- success`);
    return role;
  }

  public async updateRole(id: string, body: IRole) {
    logger.debug(`${RoleRepository.name}.updateRole -- start`);
    const role = await RoleModel.updateOne({ _id: id }, body);
    logger.debug(`${RoleRepository.name}.updateRole -- success`);
    return role;
  }

  public async deleteRole(id: string) {
    logger.debug(`${RoleRepository.name}.deleteRole -- start`);
    const role = await RoleModel.updateOne({ _id: id }, { status: false });
    logger.debug(`${RoleRepository.name}.deleteRole -- success`);
    return role;
  }
}

export default RoleRepository;

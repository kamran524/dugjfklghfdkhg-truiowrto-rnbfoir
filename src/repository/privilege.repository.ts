import { IPrivilege } from "../models/interfaces/privilege.interface";
import logger from "../log/winston";
import { PrivilegeModel } from "../models/privilege.model";

class PrivilegeRepository {
  constructor() {
  }

  public async createPrivilege(body: IPrivilege) {
    logger.debug(`${PrivilegeRepository.name}.createPrivilege -- start`);
    const privilege = await PrivilegeModel.create(body);
    logger.debug(`${PrivilegeRepository.name}.createPrivilege -- success`);
    return privilege;
  }

  public async getPrivileges() {
    logger.debug(`${PrivilegeRepository.name}.getPrivileges -- start`);
    const privileges = await PrivilegeModel.find().lean();
    logger.debug(`${PrivilegeRepository.name}.getPrivileges -- success`);
    return privileges;
  }

  public async getPrivilege(id: string) {
    logger.debug(`${PrivilegeRepository.name}.getPrivilege -- start`);
    const privilege = await PrivilegeModel.findById(id);
    logger.debug(`${PrivilegeRepository.name}.getPrivilege -- success`);
    return privilege;
  }

  public async updatePrivilege(id: string, body: IPrivilege) {
    logger.debug(`${PrivilegeRepository.name}.updatePrivilege -- start`);
    const privilege = await PrivilegeModel.updateOne({ _id: id }, body);
    logger.debug(`${PrivilegeRepository.name}.updatePrivilege -- success`);
    return privilege;
  }

  public async deletePrivilege(id: string) {
    logger.debug(`${PrivilegeRepository.name}.deletePrivilege -- start`);
    const privilege = await PrivilegeModel.updateOne({ _id: id }, { status: false });
    logger.debug(`${PrivilegeRepository.name}.deletePrivilege -- success`);
    return privilege;
  }
}

export default PrivilegeRepository;

import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import PrivilegeService from "../services/privilege.service";
import { constants } from "http2";

class PrivilegeController {
  private readonly privilegeService: PrivilegeService;

  constructor() {
    this.privilegeService = new PrivilegeService();
  }

  public createPrivilege = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${PrivilegeController.name}.createPrivilege -- start`);
      const result = await this.privilegeService.createPrivilege(request);
      logger.debug(`${PrivilegeController.name}.createPrivilege -- success`);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getPrivileges = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${PrivilegeController.name}.getPrivileges -- start`);
      const result = await this.privilegeService.getPrivileges();
      logger.debug(`${PrivilegeController.name}.getPrivileges -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getPrivilege = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PrivilegeController.name}.getPrivilege -- start`);
      const result = await this.privilegeService.getPrivilege(request);
      logger.debug(`${PrivilegeController.name}.getPrivilege -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }

  public updatePrivilege = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PrivilegeController.name}.updatePrivilege -- start`);
      const result = await this.privilegeService.updatePrivilege(request);
      logger.debug(`${PrivilegeController.name}.updatePrivilege -- start`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }

  public deletePrivilege = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${PrivilegeController.name}.deletePrivilege -- start`);
      const result = await this.privilegeService.deletePrivilege(request);
      logger.debug(`${PrivilegeController.name}.deletePrivilege -- start`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default PrivilegeController;

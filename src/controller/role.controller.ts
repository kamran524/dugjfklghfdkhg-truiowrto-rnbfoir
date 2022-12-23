import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import RoleService from "../services/role.service";
import { constants } from "http2";

class RoleController {
  private readonly roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  public createRole = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${RoleController.name}.createRole -- start`);
      const result = await this.roleService.createRole(request);
      logger.debug(`${RoleController.name}.createRole -- success`);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getRoles = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${RoleController.name}.getRoles -- start`);
      const result = await this.roleService.getRoles();
      logger.debug(`${RoleController.name}.getRoles -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public getRole = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${RoleController.name}.getRole -- start`);
      const result = await this.roleService.getRole(request);
      logger.debug(`${RoleController.name}.getRole -- success`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(`${RoleController.name}.updateRole -- start`);
      const result = await this.roleService.updateRole(request);
      logger.debug(`${RoleController.name}.updateRole -- start`);
      response.status(constants.HTTP_STATUS_OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (
      request: Request,
      response: Response,
      next: NextFunction
  ) => {
      try {
        logger.debug(`${RoleController.name}.deleteRole -- start`);
        const result = await this.roleService.deleteRole(request);
        logger.debug(`${RoleController.name}.deleteRole -- success`);
        response.status(constants.HTTP_STATUS_OK).send(result);
      } catch (error) {
        next(error);
      }
  }
}

export default RoleController;

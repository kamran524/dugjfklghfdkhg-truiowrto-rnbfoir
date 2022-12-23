import { NextFunction, Request, Response } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import BranchService from "../services/branch.service";

class BranchController {
  private readonly branchService: BranchService;

  constructor() {
    this.branchService = new BranchService();
  }

  public createBranch = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BranchController.name}.createBranch -- start`);
      const result = await this.branchService.createBranch(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${BranchController.name}.createBranch -- success`);
    } catch (error) {
      next(error);
    }
  };

  public updateBranch = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BranchController.name}.updateBranch -- start`);
      const result = await this.branchService.updateBranch(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${BranchController.name}.updateBranch -- success`);
    } catch (error) {
      next(error);
    }
  };

  public deleteBranch = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BranchController.name}.deleteBranch -- start`);
      const result = await this.branchService.deleteBranch(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${BranchController.name}.deleteBranch -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getBranch = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BranchController.name}.getBranch -- start`);
      const result = await this.branchService.getBranch(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${BranchController.name}.getBranch -- success`);
    } catch (error) {
      next(error);
    }
  };

  public getBranches = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${BranchController.name}.getBranches -- start`);
      const result = await this.branchService.getBranches();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${BranchController.name}.getBranches -- success`);
    } catch (error) {
      next(error);
    }
  };
}

export default BranchController;

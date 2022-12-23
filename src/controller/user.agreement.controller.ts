import UserAgreementService from "../services/user.agreement.service";
import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
class UserAgreementController {
  private readonly userAgreementService: UserAgreementService;
  constructor() {
    this.userAgreementService = new UserAgreementService();
  }

  public CreateUserAgreement = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${UserAgreementController.name}.CreateUserAgreement -- start`
      );
      const result = await this.userAgreementService.CreateUserAgreement(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(
        `${UserAgreementController.name}.CreateUserAgreement -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public UpdateUserAgreement = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${UserAgreementController.name}.UpdateUserAgreement -- start`
      );
      const result = await this.userAgreementService.UpdateUserAgreement(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${UserAgreementController.name}.UpdateUserAgreement -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public DeleteUserAgreement = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${UserAgreementController.name}.DeleteUserAgreement -- start`
      );
      const result = await this.userAgreementService.DeleteUserAgreement(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${UserAgreementController.name}.DeleteUserAgreement -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetUserAgreementById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${UserAgreementController.name}.GetUserAgreementById -- start`
      );
      const result = await this.userAgreementService.GetUserAgreementById(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${UserAgreementController.name}.GetUserAgreementById -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetUserAgreements = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${UserAgreementController.name}.GetUserAgreements -- start`
      );
      const result = await this.userAgreementService.GetUserAgreements();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${UserAgreementController.name}.GetUserAgreements -- success`
      );
    } catch (err) {
      next(err);
    }
  };
}

export default UserAgreementController;
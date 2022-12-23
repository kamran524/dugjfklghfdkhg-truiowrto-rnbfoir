import PrivacyPolicyService from "../services/privacy.policy.service";
import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
class PrivacyPolicyController {
  private readonly privacyPolicyService: PrivacyPolicyService;
  constructor() {
    this.privacyPolicyService = new PrivacyPolicyService();
  }

  public CreatePrivacyPolicy = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PrivacyPolicyController.name}.CreatePrivacyPolicy -- start`
      );
      const result = await this.privacyPolicyService.CreatePrivacyPolicy(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(
        `${PrivacyPolicyController.name}.CreatePrivacyPolicy -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public UpdatePrivacyPolicy = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PrivacyPolicyController.name}.UpdatePrivacyPolicy -- start`
      );
      const result = await this.privacyPolicyService.UpdatePrivacyPolicy(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PrivacyPolicyController.name}.UpdatePrivacyPolicy -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public DeletePrivacyPolicy = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PrivacyPolicyController.name}.DeletePrivacyPolicy -- start`
      );
      const result = await this.privacyPolicyService.DeletePrivacyPolicy(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PrivacyPolicyController.name}.DeletePrivacyPolicy -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetPrivacyPolicyById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PrivacyPolicyController.name}.GetPrivacyPolicyById -- start`
      );
      const result = await this.privacyPolicyService.GetPrivacyPolicyById(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PrivacyPolicyController.name}.GetPrivacyPolicyById -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetPrivacyPolicies = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PrivacyPolicyController.name}.GetPrivacyPolicies -- start`
      );
      const result = await this.privacyPolicyService.GetPrivacyPolicies();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PrivacyPolicyController.name}.GetPrivacyPolicies -- success`
      );
    } catch (err) {
      next(err);
    }
  };
}

export default PrivacyPolicyController;
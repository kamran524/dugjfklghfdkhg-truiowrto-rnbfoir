import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import CampaignService from "../services/campaign.service";
class CampaignController {
  private readonly CampaignService: CampaignService;
  constructor() {
    this.CampaignService = new CampaignService();
  }

  public CreateCampaign = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${CampaignController.name}.CreateCampaign -- start`
      );
      const result = await this.CampaignService.CreateCampaign(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(
        `${CampaignController.name}.CreateCampaign -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public UpdateCampaign = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${CampaignController.name}.UpdateCampaign -- start`
      );
      const result = await this.CampaignService.UpdateCampaign(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CampaignController.name}.UpdateCampaign -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public DeleteCampaign = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${CampaignController.name}.DeleteCampaign -- start`
      );
      const result = await this.CampaignService.DeleteCampaign(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CampaignController.name}.DeleteCampaign -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetCampaignById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${CampaignController.name}.GetCampaignById -- start`
      );
      const result = await this.CampaignService.GetCampaignById(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CampaignController.name}.GetCampaignById -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetCampaigns = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${CampaignController.name}.GetCampaigns -- start`
      );
      const result = await this.CampaignService.GetCampaigns();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${CampaignController.name}.GetCampaigns -- success`
      );
    } catch (err) {
      next(err);
    }
  };
}

export default CampaignController;
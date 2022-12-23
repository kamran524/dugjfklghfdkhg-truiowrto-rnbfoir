import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import PromoCodeService from "../services/promo.code.service";
class PromoCodeController {
  private readonly PromoCodeService: PromoCodeService;
  constructor() {
    this.PromoCodeService = new PromoCodeService();
  }

  public CreatePromoCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PromoCodeController.name}.CreatePromoCode -- start`
      );
      const result = await this.PromoCodeService.CreatePromoCode(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(
        `${PromoCodeController.name}.CreatePromoCode -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public UpdatePromoCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PromoCodeController.name}.UpdatePromoCode -- start`
      );
      const result = await this.PromoCodeService.UpdatePromoCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PromoCodeController.name}.UpdatePromoCode -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public DeletePromoCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PromoCodeController.name}.DeletePromoCode -- start`
      );
      const result = await this.PromoCodeService.DeletePromoCode(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PromoCodeController.name}.DeletePromoCode -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetPromoCodeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PromoCodeController.name}.GetPromoCodeById -- start`
      );
      const result = await this.PromoCodeService.GetPromoCodeById(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PromoCodeController.name}.GetPromoCodeById -- success`
      );
    } catch (err) {
      next(err);
    }
  };
  public GetPromoCodes = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${PromoCodeController.name}.GetPromoCodes -- start`
      );
      const result = await this.PromoCodeService.GetPromoCodes();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${PromoCodeController.name}.GetPromoCodes -- success`
      );
    } catch (err) {
      next(err);
    }
  };
}

export default PromoCodeController;
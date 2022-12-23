import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import logger from "../log/winston";
import FaqsService from "../services/faqs.service";

class FaqsController {
  private readonly faqService: FaqsService;
  constructor() {
    this.faqService = new FaqsService();
  }
  public CreateFaq = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${FaqsController.name}.CreateFaq -- start`
      );
      const result = await this.faqService.CreateFaq(
        request
      );
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(
        `${FaqsController.name}.CreateFaq -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public UpdateFaq = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${FaqsController.name}.UpdateFaq -- start`
      );
      const result = await this.faqService.UpdateFaq(
        request
      );
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${FaqsController.name}.UpdateFaq -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public DeleteFaq = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${FaqsController.name}.DeleteFaq -- start`
      );
      const result = await this.faqService.DeleteFaq(
        request
      );
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${FaqsController.name}.DeleteFaq -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public GetFaqs = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${FaqsController.name}.GetFaqs -- start`
      );
      const result = await this.faqService.GetFaqs();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${FaqsController.name}.GetFaqs -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public GetFaqById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${FaqsController.name}.GetFaqById -- start`
      );
      const result = await this.faqService.GetFaqById(
        request
      );
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${FaqsController.name}.GetFaqById -- success`
      );
    } catch (error) {
      next(error);
    }
  };
}

export default FaqsController;

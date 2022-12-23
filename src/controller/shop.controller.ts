import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import { Multer } from "../config/multer.config";
import ShopService from "../services/shop.service";

class ShopController {
  private readonly shopService: ShopService;

  constructor () {
    this.shopService = new ShopService();
  }

  public createShop = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ShopController.name}.createShop -- start`);
      const result = await this.shopService.createShop(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${ShopController.name}.createShop -- success`);
    } catch (error) {
      if (request.file) await new Multer().removeFile(request.file);
      next(error);
    }
  };

  public getShop = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ShopController.name}.getShop -- start`);
      const result = await this.shopService.getShop(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ShopController.name}.getShop -- start`);
    } catch (error) {
      next(error);
    }
  };

  public getShops = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ShopController.name}.getShops -- start`);
      const result = await this.shopService.getShops();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ShopController.name}.getShops -- start`);
    } catch (error) {
      next(error);
    }
  };

  public deleteShop = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(`${ShopController.name}.deleteShop -- start`);
      const result = await this.shopService.deleteShop(request);
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(`${ShopController.name}.deleteShop -- success`);
    } catch (err) {
      next(err);
    }
  };

  public updateShop = async(
    request:Request,
    response:Response,
    next:NextFunction
  ) =>{
    try{
      logger.debug(`${ShopController.name}.updateShop -- start`);
      const result = await this.shopService.updateShop(request);
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(`${ShopController.name}.updateShop -- success`);
    }catch(err){
      if (request.file) await new Multer().removeFile(request.file);
      next(err)
    }
  }

}

export default ShopController;

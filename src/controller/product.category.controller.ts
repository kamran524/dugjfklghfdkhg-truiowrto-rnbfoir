import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import logger from "../log/winston";
import ProductCategoryService from "../services/product.category.service";

class ProductCategoryController {
  private readonly productCategoryService: ProductCategoryService;
  constructor() {
    this.productCategoryService = new ProductCategoryService();
  }
  public CreateProductCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${ProductCategoryController.name}.CreateProductCategory -- start`
      );
      const result = await this.productCategoryService.CreateProductCategory(
        request
      );
      response.status(constants.HTTP_STATUS_CREATED).send(result);
      logger.debug(
        `${ProductCategoryController.name}.CreateProductCategory -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public UpdateProductCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${ProductCategoryController.name}.UpdateProductCategory -- start`
      );
      const result = await this.productCategoryService.UpdateProductCategory(
        request
      );
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${ProductCategoryController.name}.UpdateProductCategory -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public DeleteProductCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${ProductCategoryController.name}.DeleteProductCategory -- start`
      );
      const result = await this.productCategoryService.DeleteProductCategory(
        request
      );
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${ProductCategoryController.name}.DeleteProductCategory -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public GetProductCategories = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${ProductCategoryController.name}.GetProductCategories -- start`
      );
      const result = await this.productCategoryService.GetProductCategories();
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${ProductCategoryController.name}.GetProductCategories -- success`
      );
    } catch (error) {
      next(error);
    }
  };
  public GetProductCategoryById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      logger.debug(
        `${ProductCategoryController.name}.GetProductCategoryById -- start`
      );
      const result = await this.productCategoryService.GetProductCategoryById(
        request
      );
      response.status(constants.HTTP_STATUS_OK).send(result);
      logger.debug(
        `${ProductCategoryController.name}.GetProductCategoryById -- success`
      );
    } catch (error) {
      next(error);
    }
  };
}

export default ProductCategoryController;

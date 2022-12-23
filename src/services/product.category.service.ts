import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { ProductCategoryHelper } from "../helper/product.category.helper";
import logger from "../log/winston";
import ProductCategoryRepository from "../repository/product.category.repository";

class ProductCategoryService {
  private readonly productCategoryRepository: ProductCategoryRepository;
  constructor() {
    this.productCategoryRepository = new ProductCategoryRepository();
  }

  public async CreateProductCategory(request: Request) {
    logger.debug(
      `${ProductCategoryService.name}.CreateProductCategory -- start`
    );
    const result = await this.productCategoryRepository.CreateProductCategory(
      request.body
    );
    if (!result) {
      logger.warn(
        `${ProductCategoryService.name}.CreateProductCategory -- BadRequest`
      );
      throw ApiError.BadRequest();
    }
    logger.debug(
      `${ProductCategoryService.name}.CreateProductCategory -- success`
    );
    return result;
  }
  public async UpdateProductCategory(request: Request) {
    logger.debug(`${ProductCategoryService.name}.UpdateProductCategory -- start`);
    const { id } = request.body;
    const result = await this.productCategoryRepository.UpdateProductCategory(request.body,id);
    if(!result.modifiedCount){
        logger.warn(`${ProductCategoryService.name}.UpdateProductCategory -- BadRequest`);
        throw ApiError.BadRequest();
    }
    logger.debug(`${ProductCategoryService.name}.UpdateProductCategory -- start`);
    return result;
  }
  public async DeleteProductCategory(request:Request){
    logger.debug(`${ProductCategoryService.name}.DeleteProductCategory -- start`);
    const {id} = request.params;
    const result = await this.productCategoryRepository.DeleteProductCategory(id);
    if(!result.modifiedCount){
        logger.warn(`${ProductCategoryService.name}.DeleteProductCategory -- BadRequest`);
        throw ApiError.BadRequest();
    }
    logger.debug(`${ProductCategoryService.name}.DeleteProductCategory -- success`);
    return result;
  }
  public async GetProductCategories(){
    logger.debug(`${ProductCategoryService.name}.GetProductCategories -- start`);
    const result = await this.productCategoryRepository.GetProductCategories();
    if(!result.length){
        logger.warn(`${ProductCategoryService.name}.GetProductCategories -- NoContentException`);
        throw ApiError.NoContentException();
    }
    let data:ProductCategoryHelper[] = [];
    for(const key in result){
        data.push(new ProductCategoryHelper(result[key]));
    }
    logger.debug(`${ProductCategoryService.name}.GetProductCategories -- success`);
    return data;
  }
  public async GetProductCategoryById(request:Request){
    logger.debug(`${ProductCategoryService.name}.GetProductCategoryById -- start`);
    const {id} = request.params;
    const result = await this.productCategoryRepository.GetProductCategoryById(id);
    if(!result){
        logger.warn(`${ProductCategoryService.name}.GetProductCategoryById -- NotFoundException`);
        throw ApiError.NotFoundException();
    }
    const data = new ProductCategoryHelper(result);
    logger.debug(`${ProductCategoryService.name}.GetProductCategoryById -- success`);
    return data;
  }
}

export default ProductCategoryService;

import logger from "../log/winston";
import { ProductCategoryModel } from "../models/product.category.model";

class ProductCategoryRepository {
  constructor() {}
  public async CreateProductCategory(data:any){
    logger.debug(`${ProductCategoryRepository.name}.CreateProductCategory -- start`);
    const result = await ProductCategoryModel.create(data);
    logger.debug(`${ProductCategoryRepository.name}.CreateProductCategory -- success`);
    return result;
  }
  public async UpdateProductCategory(data:any,id:string){
    logger.debug(`${ProductCategoryRepository.name}.UpdateProductCategory -- start`);
    const result = await ProductCategoryModel.updateOne({_id:id},data);
    logger.debug(`${ProductCategoryRepository.name}.UpdateProductCategory -- success`);
    return result;
  }
  public async DeleteProductCategory(id:string){
    logger.debug(`${ProductCategoryRepository.name}.DeleteProductCategory -- start`);
    const result = await ProductCategoryModel.updateOne({_id:id},{status:false});
    logger.debug(`${ProductCategoryRepository.name}.DeleteProductCategory -- success`);
    return result;
  }
  public async GetProductCategories(){
    logger.debug(`${ProductCategoryRepository.name}.GetProductCategories -- start`);
    const result = await ProductCategoryModel.find();
    logger.debug(`${ProductCategoryRepository.name}.GetProductCategories -- success`);
    return result;
  }
  public async GetProductCategoryById(id:string){
    logger.debug(`${ProductCategoryRepository.name}.GetProductCategoryById -- start`);
    const result = await ProductCategoryModel.findById(id);
    logger.debug(`${ProductCategoryRepository.name}.GetProductCategoryById -- success`);
    return result;
  }
}

export default ProductCategoryRepository;
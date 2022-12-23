import { Router } from "express";
import ProductCategoryController from "../../controller/product.category.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { CreateProductCategoryDto } from "../../dto/product.category/create.product.category.dto";
import { UpdateProductCategoryDto } from "../../dto/product.category/update.product.category.dto";
import { RequestObjects } from "../../enum/storage/request.objects.enum";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class ProductCategoryRoute{
    path:string;
    router:Router;
    productCategoryController:ProductCategoryController;
    validation: ValidationMiddleware;
    constructor(){
        this.path = "/product/category";
        this.router = Router();
        this.productCategoryController = new ProductCategoryController();
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,this.validation.check(CreateProductCategoryDto,RequestObjects.BODY), this.productCategoryController.CreateProductCategory);
        this.router.patch(`${this.path}`,this.validation.check(UpdateProductCategoryDto,RequestObjects.BODY), this.productCategoryController.UpdateProductCategory);
        this.router.patch(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.productCategoryController.DeleteProductCategory);
        this.router.get(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.productCategoryController.GetProductCategoryById);
        this.router.get(`${this.path}`,this.productCategoryController.GetProductCategories);

    }
}
export default ProductCategoryRoute;
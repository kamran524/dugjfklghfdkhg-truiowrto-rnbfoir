import { Router } from 'express';
import ShopController from '../../controller/shop.controller';
import {CreateShopDto} from '../../dto/shop/create.shop.dto'
import {UpdateShopDto} from '../../dto/shop/update.shop.dto'
import { Multer } from '../../config/multer.config';
import {ValidationMiddleware} from "../../middlewares/validation.middleware";


class ShopRoute {
    path:string;
    router:Router;
    shopController:ShopController;
    validation:ValidationMiddleware
    multer:Multer;

    constructor() {
        this.path = '/shop'
        this.router = Router();
        this.shopController = new ShopController()
        this.multer = new Multer();
        this.validation = new ValidationMiddleware()
        this.initializeRoutes();
    };

    private initializeRoutes () {
        this.router.post(`${this.path}`,
        this.multer.upload().single("image"), 
        this.validation.check(CreateShopDto),
        this.shopController.createShop)
        this.router.get(`${this.path}/:id`,
        this.shopController.getShop)
        this.router.get(`${this.path}`,this.shopController.getShops)
        this.router.patch(`${this.path}`,
        this.multer.upload().single("image"),
        this.validation.check(UpdateShopDto),
        this.shopController.updateShop)
        this.router.delete(`${this.path}/:id`,
        this.shopController.deleteShop)
    }
}

export default ShopRoute;


// Validationlara enumlari qoş
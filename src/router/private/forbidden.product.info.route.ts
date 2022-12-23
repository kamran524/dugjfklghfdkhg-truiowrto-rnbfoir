import { Router } from 'express';
import ForbiddenProductController from '../../controller/forbidden.product.info.controller'
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import { CreateForbiddenProductDto } from '../../dto/forbidden.product.info/create.forbidden.product.info.dto'
import { UpdateForbiddenProductDto } from '../../dto/forbidden.product.info/update.forbidden.product.info.dto'

class ForbiddenProductRoute {
    path: string;
    router: Router;
    private readonly validation: ValidationMiddleware;
    private readonly forbiddenProductController: ForbiddenProductController;


    constructor() {
        this.path = '/forbbiddenProduct'
        this.router = Router()
        this.forbiddenProductController = new ForbiddenProductController()
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}`,
            // this.validation.check(CreateForbiddenProductDto),
            this.forbiddenProductController.createContent),
            this.router.get(`${this.path}/:id`,
                this.forbiddenProductController.getContent)
        this.router.get(`${this.path}`,
            this.forbiddenProductController.getContents)
        this.router.patch(`${this.path}`,
            this.validation.check(UpdateForbiddenProductDto),
            this.forbiddenProductController.updateContent)
        this.router.patch(`${this.path}/:id`,
            this.forbiddenProductController.deleteContent)
    };
};


export default ForbiddenProductRoute;
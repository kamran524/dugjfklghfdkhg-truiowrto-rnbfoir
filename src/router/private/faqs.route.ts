import { Router } from "express";
import FaqsController from "../../controller/faqs.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { CreateFaqsDto } from "../../dto/faqs/create.faqs.dto";
import { UpdateFaqsDto } from "../../dto/faqs/update.faqs.dto";
import { RequestObjects } from "../../enum/storage/request.objects.enum";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class FaqsRoute{
    private readonly path:string;
    private readonly router:Router;
    private readonly faqsController:FaqsController;
    private readonly validation: ValidationMiddleware;
    constructor(){
        this.path = "/faqs";
        this.router = Router();
        this.faqsController = new FaqsController();
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,this.validation.check(CreateFaqsDto,RequestObjects.BODY), this.faqsController.CreateFaq);
        this.router.patch(`${this.path}`,this.validation.check(UpdateFaqsDto,RequestObjects.BODY), this.faqsController.UpdateFaq);
        this.router.patch(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.faqsController.DeleteFaq);
        this.router.get(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.faqsController.GetFaqById);
        this.router.get(`${this.path}`,this.faqsController.GetFaqs);

    }
}
export default FaqsRoute;

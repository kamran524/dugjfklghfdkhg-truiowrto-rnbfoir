import { Router } from "express";
import PromoCodeController from "../../controller/promo.code.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { CreatePromoCodeDto } from "../../dto/promo.code/create.promo.code.dto";
import { UpdatePromoCodeDto } from "../../dto/promo.code/update.promo.code.dto";
import { RequestObjects } from "../../enum/storage/request.objects.enum";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class PromoCodeRoutes{
    private readonly path:string;
    private readonly router:Router;
    private readonly promoCodeController:PromoCodeController;
    private readonly validation:ValidationMiddleware;
    constructor(){
        this.path = "/promo";
        this.router = Router();
        this.promoCodeController = new PromoCodeController();
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,this.validation.check(CreatePromoCodeDto,RequestObjects.BODY),this.promoCodeController.CreatePromoCode);
        this.router.patch(`${this.path}`,this.validation.check(UpdatePromoCodeDto,RequestObjects.BODY),this.promoCodeController.UpdatePromoCode);
        this.router.patch(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.promoCodeController.DeletePromoCode);
        this.router.get(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.promoCodeController.GetPromoCodeById);
        this.router.get(`${this.path}`,this.promoCodeController.GetPromoCodes);
    }
}
export default PromoCodeRoutes;
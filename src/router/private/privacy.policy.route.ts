import { Router } from "express";
import PrivacyPolicyController from "../../controller/privacy.policy.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { CreatePrivactPolicyDto } from "../../dto/privacy.policy/create.privacy.policy.dto";
import { UpdatePrivactPolicyDto } from "../../dto/privacy.policy/update.privacy.policy.dto";
import { RequestObjects } from "../../enum/storage/request.objects.enum";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class PrivacyPolicyRoutes{
    private readonly path:string;
    private readonly router:Router;
    private readonly privacyPolicyController:PrivacyPolicyController;
    private readonly validation:ValidationMiddleware;
    constructor(){
        this.path = "/privacy/policy";
        this.router = Router();
        this.privacyPolicyController = new PrivacyPolicyController();
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,this.validation.check(CreatePrivactPolicyDto,RequestObjects.BODY),this.privacyPolicyController.CreatePrivacyPolicy);
        this.router.patch(`${this.path}`,this.validation.check(UpdatePrivactPolicyDto,RequestObjects.BODY),this.privacyPolicyController.UpdatePrivacyPolicy);
        this.router.patch(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.privacyPolicyController.DeletePrivacyPolicy);
        this.router.get(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.privacyPolicyController.GetPrivacyPolicyById);
        this.router.get(`${this.path}`,this.privacyPolicyController.GetPrivacyPolicies);
    }
}
export default PrivacyPolicyRoutes;
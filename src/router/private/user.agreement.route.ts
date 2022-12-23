import { Router } from "express";
import UserAgreementController from "../../controller/user.agreement.controller";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { CreateUserAgreementDto } from "../../dto/user.agreement/create.user.agreement.dto";
import { UpdateUserAgreementDto } from "../../dto/user.agreement/update.user.agreement.dto";
import { RequestObjects } from "../../enum/storage/request.objects.enum";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class UserAgreementRoute{
    private readonly path:string;
    private readonly router:Router;
    private readonly userAgreementController:UserAgreementController;
    private readonly validation:ValidationMiddleware;
    constructor(){
        this.path = "/user/agreement";
        this.router = Router();
        this.userAgreementController = new UserAgreementController();
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,this.validation.check(CreateUserAgreementDto,RequestObjects.BODY),this.userAgreementController.CreateUserAgreement);
        this.router.patch(`${this.path}`,this.validation.check(UpdateUserAgreementDto,RequestObjects.BODY),this.userAgreementController.UpdateUserAgreement);
        this.router.patch(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.userAgreementController.DeleteUserAgreement);
        this.router.get(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.userAgreementController.GetUserAgreementById);
        this.router.get(`${this.path}`,this.userAgreementController.GetUserAgreements);
    }
}
export default UserAgreementRoute;
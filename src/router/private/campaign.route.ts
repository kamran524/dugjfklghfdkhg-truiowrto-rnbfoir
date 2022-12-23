import { Router } from "express";
import CampaignController from "../../controller/campaign.controller";
import { CreateCampaignDto } from "../../dto/campaign/create.campaign.dto";
import { UpdateCampaignDto } from "../../dto/campaign/update.campaign.dto";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { RequestObjects } from "../../enum/storage/request.objects.enum";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

class CampaignRoutes{
    private readonly path:string;
    private readonly router:Router;
    private readonly campaignController:CampaignController;
    private readonly validation:ValidationMiddleware;
    constructor(){
        this.path = "/campaign";
        this.router = Router();
        this.campaignController = new CampaignController();
        this.validation = new ValidationMiddleware();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,this.validation.check(CreateCampaignDto,RequestObjects.BODY),this.campaignController.CreateCampaign);
        this.router.patch(`${this.path}`,this.validation.check(UpdateCampaignDto,RequestObjects.BODY),this.campaignController.UpdateCampaign);
        this.router.patch(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.campaignController.DeleteCampaign);
        this.router.get(`${this.path}/:id`,this.validation.check(ParamIdDto,RequestObjects.PARAMS),this.campaignController.GetCampaignById);
        this.router.get(`${this.path}`,this.campaignController.GetCampaigns);
    }
}
export default CampaignRoutes;
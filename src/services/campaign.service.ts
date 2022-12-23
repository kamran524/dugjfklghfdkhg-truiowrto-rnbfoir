import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { CampaignHelper } from "../helper/campaign.helper";
import logger from "../log/winston";
import CampaignRepository from "../repository/campaign.repository";

class CampaignService{
    private readonly campaignRepository:CampaignRepository;
    constructor(){
        this.campaignRepository = new CampaignRepository();
    }
    public async CreateCampaign(request:Request){
        logger.debug(`${CampaignService.name}.CreatePrivacyPolicy -- start`);
        const result = await this.campaignRepository.CreateCampaign(request.body);
        if(!result){
            logger.warn(`${CampaignService.name}.CreatePrivacyPolicy -- BadRequest`);
            throw ApiError.BadRequest();
        }
        logger.debug(`${CampaignService.name}.CreatePrivacyPolicy -- success`);
        return result;
    }
    public async UpdateCampaign(request:Request){
        logger.debug(`${CampaignService.name}.UpdatePrivacyPolicy -- start`);
        const {id} = request.body;
        const result = await this.campaignRepository.UpdateCampaign(id,request.body);
        if(!result.modifiedCount){
            logger.warn(`${CampaignService.name}.UpdatePrivacyPolicy -- BadRequest`);
            throw ApiError.BadRequest();
        }
        logger.debug(`${CampaignService.name}.UpdatePrivacyPolicy -- success`);
        return result;
    }
    public async DeleteCampaign(request:Request){
        logger.debug(`${CampaignService.name}.DeletePrivacyPolicy -- start`);
        const {id} = request.params;
        const result = await this.campaignRepository.DeleteCampaign(id);
        if(!result.modifiedCount){
            logger.warn(`${CampaignService.name}.DeletePrivacyPolicy -- BadRequest`);
            throw ApiError.BadRequest();
        }
        logger.debug(`${CampaignService.name}.DeletePrivacyPolicy -- success`);
        return result;
    }
    public async GetCampaignById(request:Request){
        logger.debug(`${CampaignService.name}.GetPrivacyPolicyById -- start`);
        const {id} = request.params;
        const result = await this.campaignRepository.GetCampaignById(id);
        if(!result){
            logger.warn(`${CampaignService.name}.GetPrivacyPolicyById -- NotFoundException`);
            throw ApiError.NotFoundException();
        }
        const data = new CampaignHelper(result);
        logger.debug(`${CampaignService.name}.GetPrivacyPolicyById -- success`);
        return data;
    }
    public async GetCampaigns(){
        logger.debug(`${CampaignService.name}.GetCampaings -- start`);
        const result = await this.campaignRepository.GetCampaigns();
        if(!result){
            logger.warn(`${CampaignService.name}.GetCampaings -- NoContentException`);
            throw ApiError.NoContentException();
        }
        let data:CampaignHelper[]=[];
        for(const key in result){
            data.push(new CampaignHelper(result[key]));
        }
        logger.debug(`${CampaignService.name}.GetCampaings -- success`);
        return data;
    }
}

export default CampaignService;
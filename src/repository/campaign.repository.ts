import logger from "../log/winston";
import { CampaignModel } from "../models/campaign.model";
import { ICampaign } from "../models/interfaces/campaign.interface";

class CampaignRepository {
  constructor() {};

   public async CreateCampaign(data: ICampaign){
     logger.debug(`${CampaignRepository.name}.createCampaign -- start`);
     const result = await CampaignModel.create(data);
     logger.debug(`${CampaignRepository.name}.createCampaign -- success`);
     return result;
   }


  public async UpdateCampaign(id:string,data: ICampaign){
    logger.debug(`${CampaignRepository.name}.updateCampaignById -- start`);
    const result = await CampaignModel.updateOne({_id:id},data);
    logger.debug(`${CampaignRepository.name}.updateCampaignById -- success`);
    return result;
  }

  public async DeleteCampaign(id:string){
    logger.debug(`${CampaignRepository.name}.deleteCampaign -- start`);
    const result = await CampaignModel.updateOne({_id:id},{status:false});
    logger.debug(`${CampaignRepository.name}.deleteCampaign -- success`);
    return result;
  }

  public async GetCampaignById(id:string){
    logger.debug(`${CampaignRepository.name}.findCampaignById -- start`);
    const result = await CampaignModel.findById(id);
    logger.debug(`${CampaignRepository.name}.findCampaignById -- success`);
    return result;
  }

  public async GetCampaigns(){
    logger.debug(`${CampaignRepository.name}.findCampaigns -- start`);
    const result = await CampaignModel.find().lean();
    logger.debug(`${CampaignRepository.name}.findCampaigns -- success`);
    return result;
  }
}

export default CampaignRepository;

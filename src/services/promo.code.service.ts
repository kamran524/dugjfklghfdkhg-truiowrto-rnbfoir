import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { PromoCodeHelper } from "../helper/promo.code.helper";
import logger from "../log/winston";
import CampaignRepository from "../repository/campaign.repository";
import PromoCodeRepository from "../repository/promo.code.repository";

class PromoCodeService {
  private readonly promoCodeRepository: PromoCodeRepository;
  private readonly campaignRepository: CampaignRepository;
  constructor() {
    this.promoCodeRepository = new PromoCodeRepository();
    this.campaignRepository = new CampaignRepository();
  }

  public async CreatePromoCode(request: Request) {
    logger.debug(
      `${PromoCodeService.name}.CreatePromoCode -- start`
    );
    request.body.isFixOrPerson = false;
    const campaign = await this.campaignRepository.CreateCampaign(request.body);
    request.body.campaignID = campaign._id;
    const result = await this.promoCodeRepository.CreatePromoCode(
      request.body
    );
    if (!result) {
      logger.warn(
        `${PromoCodeService.name}.CreatePromoCode -- BadRequest`
      );
      throw ApiError.BadRequest();
    }
    logger.debug(
      `${PromoCodeService.name}.CreatePromoCode -- success`
    );
    return result;
  }
  public async UpdatePromoCode(request: Request) {
    logger.debug(`${PromoCodeService.name}.UpdatePromoCode -- start`);
    const { id } = request.body;
    const promoCode = await this.promoCodeRepository.GetPromoCodeById(id);
    if(!promoCode){
        logger.warn(`${PromoCodeService.name}.UpdatePromoCode -- NotFoundException`);
        throw ApiError.NotFoundException();
    }
    request.body.campaignID = promoCode.campaignID;
    const campaignUpdate = await this.campaignRepository.UpdateCampaign(request.body.campaignID,request.body);
    if(!campaignUpdate.modifiedCount){
        logger.warn(`${PromoCodeService.name}.UpdatePromoCode -- BadRequest`);
        throw ApiError.BadRequest();
    }
    const result = await this.promoCodeRepository.UpdatePromoCode(request.body,id);
    if(!result.modifiedCount){
        logger.warn(`${PromoCodeService.name}.UpdatePromoCode -- BadRequest`);
        throw ApiError.BadRequest();
    }
    logger.debug(`${PromoCodeService.name}.UpdatePromoCode -- start`);
    return result;
  }
  public async DeletePromoCode(request:Request){
    logger.debug(`${PromoCodeService.name}.DeletePromoCode -- start`);
    const {id} = request.params;
    const promoCode = await this.promoCodeRepository.GetPromoCodeById(id);
    if(!promoCode){
        logger.warn(`${PromoCodeService.name}.UpdatePromoCode -- NotFoundException`);
        throw ApiError.NotFoundException();
    }
    request.body.campaignID = promoCode.campaignID;
    const campaignUpdate = await this.campaignRepository.DeleteCampaign(request.body.campaignID);
    if(!campaignUpdate.modifiedCount){
        logger.warn(`${PromoCodeService.name}.UpdatePromoCode -- BadRequest`);
        throw ApiError.BadRequest();
    }
    const result = await this.promoCodeRepository.DeletePromoCode(id);
    if(!result.modifiedCount){
        logger.warn(`${PromoCodeService.name}.DeletePromoCode -- BadRequest`);
        throw ApiError.BadRequest();
    }
    logger.debug(`${PromoCodeService.name}.DeletePromoCode -- success`);
    return result;
  }
  public async GetPromoCodes(){
    logger.debug(`${PromoCodeService.name}.GetPromoCodes -- start`);
    const result = await this.promoCodeRepository.GetPromoCodes();
    if(!result.length){
        logger.warn(`${PromoCodeService.name}.GetPromoCodes -- NoContentException`);
        throw ApiError.NoContentException();
    }
    let data:PromoCodeHelper[] = [];
    for(const key in result){
        data.push(new PromoCodeHelper(result[key]));
    }
    logger.debug(`${PromoCodeService.name}.GetPromoCodes -- success`);
    return data;
  }
  public async GetPromoCodeById(request:Request){
    logger.debug(`${PromoCodeService.name}.GetPromoCodeById -- start`);
    const {id} = request.params;
    const result = await this.promoCodeRepository.GetPromoCodeById(id);
    if(!result){
        logger.warn(`${PromoCodeService.name}.GetPromoCodeById -- NotFoundException`);
        throw ApiError.NotFoundException();
    }
    const data = new PromoCodeHelper(result);
    logger.debug(`${PromoCodeService.name}.GetPromoCodeById -- success`);
    return data;
  }
}

export default PromoCodeService;

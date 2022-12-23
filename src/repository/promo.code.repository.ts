import logger from "../log/winston";
import { IPromoCode } from "../models/interfaces/promocode.interface";
import { PromoCodeModel } from "../models/promo.code.model";

class PromoCodeRepository {
  constructor() {}
  public async CreatePromoCode(data:IPromoCode){
    logger.debug(`${PromoCodeRepository.name}.CreatePromoCode -- start`);
    const result = await PromoCodeModel.create(data);
    logger.debug(`${PromoCodeRepository.name}.CreatePromoCode -- success`);
    return result;
  }
  public async UpdatePromoCode(data:IPromoCode,id:string){
    logger.debug(`${PromoCodeRepository.name}.UpdatePromoCode -- start`);
    const result = await PromoCodeModel.updateOne({_id:id},data);
    logger.debug(`${PromoCodeRepository.name}.UpdatePromoCode -- success`);
    return result;
  }
  public async DeletePromoCode(id:string){
    logger.debug(`${PromoCodeRepository.name}.DeletePromoCode -- start`);
    const result = await PromoCodeModel.updateOne({_id:id},{status:false});
    logger.debug(`${PromoCodeRepository.name}.DeletePromoCode -- success`);
    return result;
  }
  public async GetPromoCodes(){
    logger.debug(`${PromoCodeRepository.name}.GetPromoCodes -- start`);
    const result = await PromoCodeModel.find();
    logger.debug(`${PromoCodeRepository.name}.GetPromoCodes -- success`);
    return result;
  }
  public async GetPromoCodeById(id:string){
    logger.debug(`${PromoCodeRepository.name}.GetPromoCodeById -- start`);
    const result = await PromoCodeModel.findById(id);
    logger.debug(`${PromoCodeRepository.name}.GetPromoCodeById -- success`);
    return result;
  }
}

export default PromoCodeRepository;
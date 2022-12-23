import logger from "../log/winston";
import { FaqsModel } from "../models/faqs.model";
import { IFaq } from "../models/interfaces/faqs.interface";

class FaqsRepository {
  constructor() {}
  public async CreateFaq(data:IFaq){
    logger.debug(`${FaqsRepository.name}.CreateFaq -- start`);
    const result = await FaqsModel.create(data);
    logger.debug(`${FaqsRepository.name}.CreateFaq -- success`);
    return result;
  }
  public async UpdateFaq(data:IFaq,id:string){
    logger.debug(`${FaqsRepository.name}.UpdateFaq -- start`);
    const result = await FaqsModel.updateOne({_id:id},data);
    logger.debug(`${FaqsRepository.name}.UpdateFaq -- success`);
    return result;
  }
  public async DeleteFaq(id:string){
    logger.debug(`${FaqsRepository.name}.DeleteFaq -- start`);
    const result = await FaqsModel.updateOne({_id:id},{status:false});
    logger.debug(`${FaqsRepository.name}.DeleteFaq -- success`);
    return result;
  }
  public async GetFaqs(){
    logger.debug(`${FaqsRepository.name}.GetFaqs -- start`);
    const result = await FaqsModel.find();
    logger.debug(`${FaqsRepository.name}.GetFaqs -- success`);
    return result;
  }
  public async GetFaqById(id:string){
    logger.debug(`${FaqsRepository.name}.GetFaqById -- start`);
    const result = await FaqsModel.findById(id);
    logger.debug(`${FaqsRepository.name}.GetFaqById -- success`);
    return result;
  }
}

export default FaqsRepository;
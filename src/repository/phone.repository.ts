import {PhoneModel} from "../models/phone.model";
import logger from "../log/winston";

class PhoneRepository {
  constructor() {};

  public async createPhone(data: any){
    logger.debug(`${PhoneRepository.name}.createPhone -- start`);
    const result = await PhoneModel.create(data);
    logger.debug(`${PhoneRepository.name}.createPhone -- success`);
    return result;
  }

  public async updatePhoneById(id:string,data: any){
    logger.debug(`${PhoneRepository.name}.updatePhoneById -- start`);
    const result = await PhoneModel.updateOne({_id:id},data);
    logger.debug(`${PhoneRepository.name}.updatePhoneById -- success`);
    return result;
  }

  public async deletePhone(id:string){
    logger.debug(`${PhoneRepository.name}.deletePhone -- start`);
    const result = await PhoneModel.updateOne({_id:id},{status:false});
    logger.debug(`${PhoneRepository.name}.deletePhone -- success`);
    return result;
  }

  public async findPhoneById(id:string){
    logger.debug(`${PhoneRepository.name}.findPhoneById -- start`);
    const result = await PhoneModel.findById(id);
    logger.debug(`${PhoneRepository.name}.findPhoneById -- success`);
    return result;
  }


  public async findPhones(){
    logger.debug(`${PhoneRepository.name}.findPhones -- start`);
    const result = await PhoneModel.find().lean();
    logger.debug(`${PhoneRepository.name}.findPhones -- success`);
    return result;
  }
}

export default PhoneRepository;

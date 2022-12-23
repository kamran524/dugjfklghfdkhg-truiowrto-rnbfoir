import {ClServiceModel} from "../models/cl.service.model";
import logger from "../log/winston";
import { IClService } from "../models/interfaces/cl.service.interface";

class ClServiceRepository {
  constructor() {};

  public async createClService(data: IClService){
    logger.debug(`${ClServiceRepository.name}.createClService -- start`);
    const result = await ClServiceModel.create(data);
    logger.debug(`${ClServiceRepository.name}.createClService -- success`);
    return result;
  }

  public async updateClServiceById(id:string,data: IClService){
    logger.debug(`${ClServiceRepository.name}.updateClServiceById -- start`);
    const result = await ClServiceModel.updateOne({_id:id},data);
    logger.debug(`${ClServiceRepository.name}.updateClServiceById -- success`);
    return result;
  }

  public async deleteClService(id:string){
    logger.debug(`${ClServiceRepository.name}.deleteClService -- start`);
    const result = await ClServiceModel.updateOne({_id:id},{status:false});
    logger.debug(`${ClServiceRepository.name}.deleteClService -- success`);
    return result;
  }

  public async findClServiceById(id:string){
    logger.debug(`${ClServiceRepository.name}.findClServiceById -- start`);
    const result = await ClServiceModel.findById(id);
    logger.debug(`${ClServiceRepository.name}.findClServiceById -- success`);
    return result;
  }


  public async findClServicees(){
    logger.debug(`${ClServiceRepository.name}.findClServicees -- start`);
    const result = await ClServiceModel.find().lean();
    logger.debug(`${ClServiceRepository.name}.findClServicees -- success`);
    return result;
  }
}

export default ClServiceRepository;

import {DistrictsModel} from "../models/districts.model";
import logger from "../log/winston";

class DistrictRepository {
  constructor() {};

  public async createDistrict(data: any){
    logger.debug(`${DistrictRepository.name}.createDistrict -- start`);
    const result = await DistrictsModel.create(data);
    logger.debug(`${DistrictRepository.name}.createDistrict -- success`);
    return result;
  }

  public async updateDistrictById(id:string,name:string){
    logger.debug(`${DistrictRepository.name}.updateDistrictById -- start`);
    const result = await DistrictsModel.updateOne({_id:id},{name:name});
    logger.debug(`${DistrictRepository.name}.updateDistrictById -- success`);
    return result;
  }

  public async deleteDistrict(id:string){
    logger.debug(`${DistrictRepository.name}.deleteDistrict -- start`);
    const result = await DistrictsModel.updateOne({_id:id},{status:false});
    logger.debug(`${DistrictRepository.name}.deleteDistrict -- success`);
    return result;
  }

  public async findDistrictById(id:string){
    logger.debug(`${DistrictRepository.name}.findDistrictById -- start`);
    const result = await DistrictsModel.findById(id);
    logger.debug(`${DistrictRepository.name}.findDistrictById -- success`);
    return result;
  }

  public async findDistrictsByCityId(id:string){
    logger.debug(`${DistrictRepository.name}.findDistricts -- start`);
    const result = await DistrictsModel.find({cityID:id}).lean();
    logger.debug(`${DistrictRepository.name}.findDistricts -- success`);
    return result;
  }

  public async findDistricts(){
    logger.debug(`${DistrictRepository.name}.findDistricts -- start`);
    const result = await DistrictsModel.find().lean();
    logger.debug(`${DistrictRepository.name}.findDistricts -- success`);
    return result;
  }
}

export default DistrictRepository;

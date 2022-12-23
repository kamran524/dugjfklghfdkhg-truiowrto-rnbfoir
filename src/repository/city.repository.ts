import {CityModel} from "../models/city.model";
import logger from "../log/winston";

class CityRepository {
  constructor() {};

  public async createCity(data: any){
    logger.debug(`${CityRepository.name}.createCity -- start`);
    const result = await CityModel.create(data);
    logger.debug(`${CityRepository.name}.createCity -- success`);
    return result;
  }

  public async updateCityById(id:string,name: string){
    logger.debug(`${CityRepository.name}.updateCityById -- start`);
    const result = await CityModel.updateOne({_id:id},{name:name});
    logger.debug(`${CityRepository.name}.updateCityById -- success`);
    return result;
  }

  public async deleteCity(id:string){
    logger.debug(`${CityRepository.name}.deleteCity -- start`);
    const result = await CityModel.updateOne({_id:id},{status:false});
    logger.debug(`${CityRepository.name}.deleteCity -- success`);
    return result;
  }

  public async findCityById(id:string){
    logger.debug(`${CityRepository.name}.findCityById -- start`);
    const result = await CityModel.findById(id).lean();
    logger.debug(`${CityRepository.name}.findCityById -- success`);
    return result;
  }

  public async findCitiesByCountryId(id:string){
    logger.debug(`${CityRepository.name}.findCities -- start`);
    const result = await CityModel.find().where({countryID:id}).lean();
    logger.debug(`${CityRepository.name}.findCities -- success`);
    return result;
  }

  public async findCities(){
    logger.debug(`${CityRepository.name}.findCities -- start`);
    const result = await CityModel.find().lean();
    logger.debug(`${CityRepository.name}.findCities -- success`);
    return result;
  }
}

export default CityRepository;

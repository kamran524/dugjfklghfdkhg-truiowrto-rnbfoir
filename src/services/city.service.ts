import {Request} from "express";
import logger from "../log/winston";
import CityRepository from "../repository/city.repository";
import {CityHelper} from "../helper/city.helper";
import {isEmptyArray} from "../util/array.util";
import {ApiError} from "../errors/api.error";

class CityService {
  private readonly cityRepository:CityRepository;

  constructor() {
    this.cityRepository = new CityRepository();
  }

  public async createCity(request:Request){
    logger.debug(`${CityService.name}.createCity -- start`);
    const result = await this.cityRepository.createCity(request.body);
    if (!result){
      logger.warn(`${CityService.name}.createCity -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${CityService.name}.createCity -- success`);
    return result;
  }

  public async updateCity(request:Request){
    logger.debug(`${CityService.name}.updateCity -- start`);
    const {id,name} = request.body;
    if (!id && !name){
      logger.warn(`${CityService.name}.updateCity -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.cityRepository.updateCityById(id,name);
    if (!result.modifiedCount){
      logger.warn(`${CityService.name}.updateCity -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${CityService.name}.updateCity -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${CityService.name}.updateCity -- success`);
    return result;
  }

  public async deleteCity(request:Request){
    logger.debug(`${CityService.name}.deleteCity -- start`);
    const {id} = request.params;
    const result = await this.cityRepository.deleteCity(id);
    if (!result.modifiedCount){
      logger.warn(`${CityService.name}.deleteCity -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${CityService.name}.deleteCity -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${CityService.name}.deleteCity -- success`);
    return result;
  }

  public async getCity(request:Request){
    logger.debug(`${CityService.name}.getCity -- start`);
    const {id} = request.params;
    const result = await this.cityRepository.findCityById(id);
    if (!result){
      logger.warn(`${CityService.name}.getCity -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new CityHelper(result);
    logger.debug(`${CityService.name}.getCity -- success`);
    return data;
  }

  public async getCitiesByCountry(request:Request){
    logger.debug(`${CityService.name}.getCitiesByCountry -- start`);
    const {id} = request.params;
    const result = await this.cityRepository.findCitiesByCountryId(id);
    if (!isEmptyArray(result)){
      logger.warn(`${CityService.name}.getCitiesByCountry -- NoContentException`);
      throw ApiError.NoContentException();
    }
    let data: CityHelper[] = [];
    for (const key in result) { data.push(new CityHelper(result[key])) };
    logger.debug(`${CityService.name}.getCitiesByCountry -- success`);
    return result;
  }


  public async getCities(){
    logger.debug(`${CityService.name}.getCities -- start`);
    const result = await this.cityRepository.findCities();
    if (!isEmptyArray(result)){
      logger.warn(`${CityService.name}.getCities -- NoContentException`);
      throw ApiError.NoContentException();
    }
    let data: CityHelper[] = [];
    for (const key in result) { data.push(new CityHelper(result[key])) };
    logger.debug(`${CityService.name}.getCities -- success`);
    return result;
  }
}


export default CityService;

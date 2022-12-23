import {Request} from "express";
import logger from "../log/winston";
import CountryRepository from "../repository/country.repository";
import envConfig from "../config/env.config";
import {ApiError} from "../errors/api.error";
import {isEmptyArray} from "../util/array.util";
import {Multer} from "../config/multer.config";
import {CountryHelper} from "../helper/country.helper";

class CountryService {
  private readonly countryRepository:CountryRepository;

  constructor() {
    this.countryRepository = new CountryRepository();
  }


  public async createCountry(request:Request){
    logger.debug(`${CountryService.name}.createCountry -- start`);
    if (!request.file?.filename){
      logger.warn(`${CountryService.name}.createCountry -- BadRequest`);
      throw ApiError.BadRequest("File not found");
    }
    let path = envConfig.URL + "public/" +request.file.filename;
    if (path){request.body["image"] = path}else{throw ApiError.BadRequest()};
    const result = await this.countryRepository.createCountry(request.body);
    if (!result){
      logger.warn(`${CountryService.name}.createCountry -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${CountryService.name}.createCountry -- success`);
    return result;
  }

  public async updateCountry(request:Request){
    logger.debug(`${CountryService.name}.updateCountry -- start`);
    const {id} = request.body;
    if (!id){
      logger.warn(`${CountryService.name}.updateCountry -- BadRequest`);
      throw ApiError.BadRequest();
    }
    delete request.body.id;
    if (request.file){
      let path = envConfig.URL + "public/" +request.file.filename;
      if (path){request.body["image"] = path}else{throw ApiError.BadRequest()};
    }
    let result = await this.countryRepository.updateCountryById(id,request.body);
    if (!result){
      logger.warn(`${CountryService.name}.updateCountry -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    if (request.file){
      await new Multer().removeFile(result.image.toString().split("/")[4] as unknown as Express.Multer.File);
    }
    logger.debug(`${CountryService.name}.updateCountry -- success`);
    return result;
  }

  public async deleteCountry(request:Request){
    logger.debug(`${CountryService.name}.deleteCountry -- start`);
    const {id} = request.params;
    const result = await this.countryRepository.deleteCountry(id);
    if (!result.modifiedCount){
      logger.warn(`${CountryService.name}.deleteCountry -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${CountryService.name}.deleteCountry -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${CountryService.name}.deleteCountry -- success`);
    return result;
  }

  public async getCountry(request:Request){
    logger.debug(`${CountryService.name}.getCountry -- start`);
    const {id} = request.params;
    const result = await this.countryRepository.findCountryById(id);
    if (!result){
      logger.warn(`${CountryService.name}.getCountry -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new CountryHelper(result);
    logger.debug(`${CountryService.name}.getCountry -- success`);
    return data;
  }

  public async getCountries(){
    logger.debug(`${CountryService.name}.getCountries -- start`);
    const result = await this.countryRepository.findCountries();
    if (!isEmptyArray(result)){
      logger.warn(`${CountryService.name}.getCountries -- NoContentException`);
      throw ApiError.NoContentException();
    }
    let data: CountryHelper[] = [];
    for (const key in result) { data.push(new CountryHelper(result[key])) };
    logger.debug(`${CountryService.name}.getCountries -- success`);
    return data;
  }
}

export default CountryService;

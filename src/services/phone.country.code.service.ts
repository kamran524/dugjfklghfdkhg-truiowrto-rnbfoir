import {Request} from "express";
import logger from "../log/winston";
import CountryCodeRepository from "../repository/phone.country.code.repository";
import {ApiError} from "../errors/api.error";
import {isEmptyArray} from "../util/array.util";
import {PhoneCountryCodeHelper} from "../helper/phone.country.code.helper";


class CountryCodeService {
  private readonly countryCodeRepository:CountryCodeRepository;

  constructor() {
    this.countryCodeRepository = new CountryCodeRepository();
  }

  public async createCountryCode(request:Request){
    logger.debug(`${CountryCodeService.name}.createCountryCode -- start`);
    const result = await this.countryCodeRepository.createCountryCode(request.body);
    if (!result){
      logger.warn(`${CountryCodeService.name}.createCountryCode -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${CountryCodeService.name}.createCountryCode -- success`);
    return result;
  }

  public async updateCountryCode(request:Request){
    logger.debug(`${CountryCodeService.name}.updateCountryCode -- start`);
    const {id} = request.body;
    if (!id){
      logger.warn(`${CountryCodeService.name}.updateCountryCode -- BadRequest`);
      throw ApiError.BadRequest();
    }
    delete request.body.id;
    const result = await this.countryCodeRepository.updateCountryCodeById(id,request.body);
    if (!result.modifiedCount){
      logger.warn(`${CountryCodeService.name}.updateCountryCode -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${CountryCodeService.name}.updateCountryCode -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${CountryCodeService.name}.updateCountryCode -- success`);
    return result;
  }

  public async deleteCountryCode(request:Request){
    logger.debug(`${CountryCodeService.name}.deleteCountryCode -- start`);
    const {id} = request.params;
    if (!id){
      logger.warn(`${CountryCodeService.name}.deleteCountryCode -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.countryCodeRepository.deleteCountryCode(id);
    if (!result.modifiedCount){
      logger.warn(`${CountryCodeService.name}.deleteCountryCode -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${CountryCodeService.name}.deleteCountryCode -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${CountryCodeService.name}.deleteCountryCode -- success`);
    return result;
  }

  public async getCountryCode(request:Request){
    logger.debug(`${CountryCodeService.name}.getCountryCode -- start`);
    const {id} = request.params;
    if (!id){
      logger.warn(`${CountryCodeService.name}.getCountryCode -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.countryCodeRepository.findCountryCodeById(id);
    if (!result){
      logger.warn(`${CountryCodeService.name}.getCountryCode -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new PhoneCountryCodeHelper(result);
    logger.debug(`${CountryCodeService.name}.getCountryCode -- success`);
    return data;
  }

  public async getCountryCodes(){
    logger.debug(`${CountryCodeService.name}.getCountryCodes -- start`);
    const result = await this.countryCodeRepository.findCountryCodes();
    if (!isEmptyArray(result)){
      logger.warn(`${CountryCodeService.name}.getCountryCodes -- NoContentException`);
      throw ApiError.NoContentException();
    }
    const data: PhoneCountryCodeHelper[] = [];
    for (const key in result) { data.push(new PhoneCountryCodeHelper(result[key])) };
    logger.debug(`${CountryCodeService.name}.getCountryCodes -- success`);
    return data;
  }
}

export default CountryCodeService;

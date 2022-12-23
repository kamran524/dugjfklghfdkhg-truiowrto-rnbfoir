import {Request} from "express";
import logger from "../log/winston";
import PhoneRepository from "../repository/phone.repository";
import {ApiError} from "../errors/api.error";
import {isEmptyArray} from "../util/array.util";
import {PhoneHelper} from "../helper/phone.helper";

class PhoneService {
  private readonly phoneRepository:PhoneRepository;

  constructor() {
    this.phoneRepository = new PhoneRepository();
  }

  public async createPhone(request:Request){
    logger.debug(`${PhoneService.name}.createPhone -- start`);
    const result = await this.phoneRepository.createPhone(request.body);
    if (!result){
      logger.warn(`${PhoneService.name}.createPhone -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${PhoneService.name}.createPhone -- success`);
    return result;
  }

  public async updatePhone(request:Request){
    logger.debug(`${PhoneService.name}.updatePhone -- start`);
    const {id} = request.body;
    if (!id){
      logger.warn(`${PhoneService.name}.updatePhone -- BadRequest`);
      throw ApiError.BadRequest();
    }
    delete request.body.id;
    const result = await this.phoneRepository.updatePhoneById(id,request.body);
    if (!result.modifiedCount){
      logger.warn(`${PhoneService.name}.updatePhone -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${PhoneService.name}.updatePhone -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${PhoneService.name}.updatePhone -- success`);
    return result;
  }

  public async deletePhone(request:Request){
    logger.debug(`${PhoneService.name}.deletePhone -- start`);
    const {id} = request.params;
    if (!id){
      logger.warn(`${PhoneService.name}.deletePhone -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.phoneRepository.deletePhone(id);
    if (!result.modifiedCount){
      logger.warn(`${PhoneService.name}.deletePhone -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${PhoneService.name}.deletePhone -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${PhoneService.name}.deletePhone -- success`);
    return result;
  }

  public async getPhone(request:Request){
    logger.debug(`${PhoneService.name}.getPhone -- start`);
    const {id} = request.params;
    if (!id){
      logger.warn(`${PhoneService.name}.getPhone -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.phoneRepository.findPhoneById(id);
    if (!result){
      logger.warn(`${PhoneService.name}.getPhone -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new PhoneHelper(result);
    logger.debug(`${PhoneService.name}.getPhone -- success`);
    return data;
  }

  public async getPhones(){
    logger.debug(`${PhoneService.name}.getPhones -- start`);
    const result = await this.phoneRepository.findPhones();
    if (!isEmptyArray(result)){
      logger.warn(`${PhoneService.name}.getOperatorCodes -- NoContentException`);
      throw ApiError.NoContentException();
    }
    const data: PhoneHelper[] = [];
    for (const key in result) { data.push(new PhoneHelper(result[key])) };
    logger.debug(`${PhoneService.name}.getPhones -- success`);
    return data;
  }
}

export default PhoneService;

import {Request} from "express";
import logger from "../log/winston";
import OperatorCodeRepository from "../repository/phone.operator.repository";
import {ApiError} from "../errors/api.error";
import {isEmptyArray} from "../util/array.util";
import {PhoneOperatorCodeHelper} from "../helper/phone.operator.code.helper";

class OperatorCodeService {
  private readonly operatorCodeRepository:OperatorCodeRepository;

  constructor() {
    this.operatorCodeRepository = new OperatorCodeRepository();
  }

  public async createOperatorCode(request:Request){
    logger.debug(`${OperatorCodeService.name}.createOperatorCode -- start`);
    const result = await this.operatorCodeRepository.createOperatorCode(request.body);
    if (!result){
      logger.warn(`${OperatorCodeService.name}.createOperatorCode -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${OperatorCodeService.name}.createOperatorCode -- success`);
    return result;
  }

  public async updateOperatorCode(request:Request){
    logger.debug(`${OperatorCodeService.name}.updateOperatorCode -- start`);
    const {id} = request.body;
    if (!id){
      logger.warn(`${OperatorCodeService.name}.updateOperatorCode -- BadRequest`);
      throw ApiError.BadRequest();
    }
    delete request.body.id;
    const result = await this.operatorCodeRepository.updateOperatorCodeById(id,request.body);
    if (!result.modifiedCount){
      logger.warn(`${OperatorCodeService.name}.updateOperatorCode -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${OperatorCodeService.name}.updateOperatorCode -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${OperatorCodeService.name}.updateOperatorCode -- success`);
    return result;
  }

  public async deleteOperatorCode(request:Request){
    logger.debug(`${OperatorCodeService.name}.deleteOperatorCode -- start`);
    const {id} = request.params;
    if (!id){
      logger.warn(`${OperatorCodeService.name}.deleteOperatorCode -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.operatorCodeRepository.deleteOperatorCode(id);
    if (!result.modifiedCount){
      logger.warn(`${OperatorCodeService.name}.deleteOperatorCode -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${OperatorCodeService.name}.deleteOperatorCode -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${OperatorCodeService.name}.deleteOperatorCode -- success`);
    return result;
  }

  public async getOperatorCode(request:Request){
    logger.debug(`${OperatorCodeService.name}.getOperatorCode -- start`);
    const {id} = request.params;
    if (!id){
      logger.warn(`${OperatorCodeService.name}.getOperatorCode -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.operatorCodeRepository.findOperatorCodeById(id);
    if (!result){
      logger.warn(`${OperatorCodeService.name}.getOperatorCode -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new PhoneOperatorCodeHelper(result);
    logger.debug(`${OperatorCodeService.name}.getOperatorCode -- success`);
    return data;
  }

  public async getOperatorCodes(){
    logger.debug(`${OperatorCodeService.name}.getOperatorCodes -- start`);
    const result = await this.operatorCodeRepository.findOperatorCodes();
    if (!isEmptyArray(result)){
      logger.warn(`${OperatorCodeService.name}.getOperatorCodes -- NoContentException`);
      throw ApiError.NoContentException();
    }
    const data: PhoneOperatorCodeHelper[] = [];
    for (const key in result) { data.push(new PhoneOperatorCodeHelper(result[key])) };
    logger.debug(`${OperatorCodeService.name}.getOperatorCodes -- success`);
    return data;
  }
}

export default OperatorCodeService;

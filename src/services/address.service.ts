import {Request} from "express";
import logger from "../log/winston";
import AddressRepository from "../repository/address.repository";
import {ApiError} from "../errors/api.error";
import {AddressHelper} from "../helper/address.helper";
import {isEmptyArray} from "../util/array.util";

class AddressService {
  private readonly addressRepository:AddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async createAddress(request:Request){
    logger.debug(`${AddressService.name}.createAddress -- start`);
    const result = await this.addressRepository.createAddress(request.body);
    if (!result){
      logger.warn(`${AddressService.name}.createAddress -- GeneralException`);
      throw ApiError.GeneralException();
    }
    logger.debug(`${AddressService.name}.createAddress -- success`);
    return result;
  }

  public async updateAddress(request:Request){
    logger.debug(`${AddressService.name}.updateAddress -- start`);
    const {id} = request.body;
    delete request.body.id;
    const result = await this.addressRepository.updateAddressById(id,request.body);
    if (!result.modifiedCount){
      logger.warn(`${AddressService.name}.updateAddress -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${AddressService.name}.updateAddress -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${AddressService.name}.updateAddress -- success`);
    return result;
  }

  public async deleteAddress(request:Request){
    logger.debug(`${AddressService.name}.deleteAddress -- start`);
    const {id} = request.params;
    const result = await this.addressRepository.deleteAddress(id);
    if (!result.acknowledged) {
      logger.error(`${AddressService.name}.deleteAddress -- not deleted`);
      throw ApiError.ServiceUnavailableException("Flight could not be deleted!");
    } else if (result.deletedCount == 0) {
      logger.debug(`${AddressService.name}.deleteAddress -- not found`);
      throw ApiError.NotFoundException(`Flight with id ${id} not found!`);
    }
    logger.debug(`${AddressService.name}.deleteAddress -- success`);
    return result;
  }

  public async changeAddressStatus(request:Request){
    logger.debug(`${AddressService.name}.changeAddressStatus -- start`);
    const {id} = request.params;
    const result = await this.addressRepository.modifyAddressStatus(id);
    if (!result.modifiedCount){
      logger.warn(`${AddressService.name}.changeAddressStatus -- GeneralException`);
      throw ApiError.GeneralException();
    }
    if (!result.matchedCount){
      logger.warn(`${AddressService.name}.changeAddressStatus -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${AddressService.name}.changeAddressStatus -- success`);
    return result;
  }


  public async getAddress(request:Request){
    logger.debug(`${AddressService.name}.getAddress -- start`);
    const {id} = request.params;
    const result = await this.addressRepository.findAddressById(id);
    if (!result){
      logger.warn(`${AddressService.name}.getAddress -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new AddressHelper(result);
    logger.debug(`${AddressService.name}.getAddress -- success`);
    return data;
  }

  public async getAddresses(){
    logger.debug(`${AddressService.name}.getAddresses -- start`);
    const result = await this.addressRepository.findAddresses();
    if (!isEmptyArray(result)){
      logger.warn(`${AddressService.name}.getAddresses -- NoContentException`);
      throw ApiError.NoContentException();
    }
    let data: AddressHelper[] = [];
    for (const key in result) { data.push(new AddressHelper(result[key])) };
    logger.debug(`${AddressService.name}.getAddresses -- success`);
    return data;
  }
}

export default AddressService;

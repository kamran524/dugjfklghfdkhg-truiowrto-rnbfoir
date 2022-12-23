import {AddressModel} from "../models/address.model";
import logger from "../log/winston";

class AddressRepository {
 constructor() {};

  public async createAddress(data: any){
    logger.debug(`${AddressRepository.name}.createAddress -- start`);
    const result = await AddressModel.create(data);
    logger.debug(`${AddressRepository.name}.createAddress -- success`);
    return result;
  }

  public async updateAddressById(id:string,data: any){
    logger.debug(`${AddressRepository.name}.updateAddressById -- start`);
    const result = await AddressModel.updateOne({_id:id},data);
    logger.debug(`${AddressRepository.name}.updateAddressById -- success`);
    return result;
  }

  public async deleteAddress(id:string){
    logger.debug(`${AddressRepository.name}.deleteAddress -- start`);
    const result = await AddressModel.deleteOne({_id:id});
    logger.debug(`${AddressRepository.name}.deleteAddress -- success`);
    return result;
  }

  public async modifyAddressStatus(id:string){
    logger.debug(`${AddressRepository.name}.modifyAddressStatus -- start`);
    const result = await AddressModel.updateOne({_id:id},{status:false});
    logger.debug(`${AddressRepository.name}.modifyAddressStatus -- success`);
    return result;
  }


  public async findAddressById(id:string){
    logger.debug(`${AddressRepository.name}.findAddressById -- start`);
    const result = await AddressModel.findById(id);
    logger.debug(`${AddressRepository.name}.findAddressById -- success`);
    return result;
  }


  public async findAddresses(){
    logger.debug(`${AddressRepository.name}.findAddresses -- start`);
    const result = await AddressModel.find().lean();
    logger.debug(`${AddressRepository.name}.findAddresses -- success`);
    return result;
  }
}

export default AddressRepository;

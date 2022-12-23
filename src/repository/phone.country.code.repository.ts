import {CountryCodeModel} from "../models/country.code.model";
import logger from "../log/winston";

class CountryCodeRepository {
  constructor() {};

  public async createCountryCode(data: any){
    logger.debug(`${CountryCodeRepository.name}.createCountryCode -- start`);
    const result = await CountryCodeModel.create(data);
    logger.debug(`${CountryCodeRepository.name}.createCountryCode -- success`);
    return result;
  }

  public async updateCountryCodeById(id:string,data: any){
    logger.debug(`${CountryCodeRepository.name}.updateCountryCodeById -- start`);
    const result = await CountryCodeModel.updateOne({_id:id},data);
    logger.debug(`${CountryCodeRepository.name}.updateCountryCodeById -- success`);
    return result;
  }

  public async deleteCountryCode(id:string){
    logger.debug(`${CountryCodeRepository.name}.deleteCountryCode -- start`);
    const result = await CountryCodeModel.updateOne({_id:id},{status:false});
    logger.debug(`${CountryCodeRepository.name}.deleteCountryCode -- success`);
    return result;
  }

  public async findCountryCodeById(id:string){
    logger.debug(`${CountryCodeRepository.name}.findCountryCodeById -- start`);
    const result = await CountryCodeModel.findById(id);
    logger.debug(`${CountryCodeRepository.name}.findCountryCodeById -- success`);
    return result;
  }


  public async findCountryCodes(){
    logger.debug(`${CountryCodeRepository.name}.findCountryCodes -- start`);
    const result = await CountryCodeModel.find().lean();
    logger.debug(`${CountryCodeRepository.name}.findCountryCodes -- success`);
    return result;
  }
}

export default CountryCodeRepository;

import {CountryModel} from "../models/country.model";
import logger from "../log/winston";

class CountryRepository {
  constructor() {};

  public async createCountry(data: any){
    logger.debug(`${CountryRepository.name}.createCountry -- start`);
    const result = await CountryModel.create(data);
    logger.debug(`${CountryRepository.name}.createCountry -- success`);
    return result;
  }

  public async updateCountryById(id:string,data: any){
    logger.debug(`${CountryRepository.name}.updateCountryById -- start`);
    const result = await CountryModel.findOneAndUpdate({_id:id},data);
    logger.debug(`${CountryRepository.name}.updateCountryById -- success`);
    return result;
  }

  public async deleteCountry(id:string){
    logger.debug(`${CountryRepository.name}.deleteCountry -- start`);
    const result = await CountryModel.updateOne({_id:id},{status:false});
    logger.debug(`${CountryRepository.name}.deleteCountry -- success`);
    return result;
  }

  public async findCountryById(id:string){
    logger.debug(`${CountryRepository.name}.findCountryById -- start`);
    const result = await CountryModel.findOne({_id:id}).lean();
    logger.debug(`${CountryRepository.name}.findCountryById -- success`);
    return result;
  }


  public async findCountries(){
    logger.debug(`${CountryRepository.name}.findCountries -- start`);
    const result = await CountryModel.find().lean();
    logger.debug(`${CountryRepository.name}.findCountries -- success`);
    return result;
  }
}

export default CountryRepository;

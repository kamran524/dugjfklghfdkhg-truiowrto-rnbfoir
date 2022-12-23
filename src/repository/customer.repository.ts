import logger from "../log/winston";
import {CustomerModel} from "../models/customer.model";

class CustomerRepository {
  constructor() {};

   public async createCustomer(data: any){
     logger.debug(`${CustomerRepository.name}.createCustomer -- start`);
     const result = await CustomerModel.create(data);
     logger.debug(`${CustomerRepository.name}.createCustomer -- success`);
     return result;
   }


  public async updateCustomerById(id:string,data: any){
    logger.debug(`${CustomerRepository.name}.updateCustomerById -- start`);
    const result = await CustomerModel.updateOne({_id:id},data);
    logger.debug(`${CustomerRepository.name}.updateCustomerById -- success`);
    return result;
  }

  public async deleteCustomer(id:string){
    logger.debug(`${CustomerRepository.name}.deleteCustomer -- start`);
    const result = await CustomerModel.updateOne({_id:id},{status:false});
    logger.debug(`${CustomerRepository.name}.deleteCustomer -- success`);
    return result;
  }

  public async findCustomerById(id:string){
    logger.debug(`${CustomerRepository.name}.findCustomerById -- start`);
    const result = await CustomerModel.findById(id);
    logger.debug(`${CustomerRepository.name}.findCustomerById -- success`);
    return result;
  }


  public async findCustomerByUniqueVal(value:object){
    logger.debug(`${CustomerRepository.name}.findCustomerByUniqueVal -- start`);
    const result = await CustomerModel.findOne(value);
    logger.debug(`${CustomerRepository.name}.findCustomerByUniqueVal -- success`);
    return result;
  }


  public async findCustomers(){
    logger.debug(`${CustomerRepository.name}.findCustomers -- start`);
    const result = await CustomerModel.find().lean();
    logger.debug(`${CustomerRepository.name}.findCustomers -- success`);
    return result;
  }
}

export default CustomerRepository;

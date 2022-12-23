import { Request } from "express";
import { ApiError } from "../errors/api.error";
import logger from "../log/winston";
import AddressRepository from "../repository/address.repository";
import CustomerRepository from "../repository/customer.repository";
import PhoneRepository from "../repository/phone.repository";
import { isEmptyArray } from "../util/array.util";
import bcrypt from "bcrypt";
import CustomerHelper from "../helper/customer.helper";

class CustomerService {
  private readonly customerRepository: CustomerRepository;
  private readonly phoneRepository: PhoneRepository;
  private readonly addressRepository: AddressRepository;
  
  constructor() {
    this.customerRepository = new CustomerRepository();
    this.phoneRepository = new PhoneRepository();
    this.addressRepository = new AddressRepository();
  }

  public async createCustomer(request: Request) {
    logger.debug(`${CustomerService.name}.createCustomer -- start`);
    const {
      countryID,
      cityID,
      street,
      regionID,
      operatorCodeID,
      countryCodeID,
      number,
      password,
    } = request.body;

    const phone = await this.phoneRepository.createPhone({
      operatorCodeID,
      countryCodeID,
      number,
    });
    const address = await this.addressRepository.createAddress({
      countryID,
      cityID,
      street,
      districtID: regionID,
    });
    if (!phone || !address) {
      logger.warn(`${CustomerRepository.name}.createCustomer -- BadRequest`);
      throw ApiError.BadRequest();
    }
    request.body.phoneID = phone._id;
    request.body.addressID = address._id;
    request.body.password = await bcrypt.hash(password, 12);
    const result = await this.customerRepository.createCustomer(request.body);
    logger.debug(`${CustomerService.name}.createCustomer -- success`);
    return result;
  }

  public async updateCustomer(request: Request) {
    logger.debug(`${CustomerService.name}.updateCustomer -- start`);
    const {
      id,
      countryID,
      cityID,
      street,
      regionID,
      operatorCodeID,
      countryCodeID,
      number,
      password,
      status,
    } = request.body;
    const customer = await this.customerRepository.findCustomerById(id);
    if (!customer) {
      logger.warn(`${CustomerService.name}.updateCustomer -- BadRequest`);
      throw ApiError.BadRequest();
    }
    if(password){
      request.body.password = await bcrypt.hash(password,12);
    }
    request.body.phoneID = customer.phoneID;
    request.body.addressID = customer.addressID;
    const phone = await this.phoneRepository.updatePhoneById(
      request.body.phoneID,
      {
        operatorCodeID,
        countryCodeID,
        number,
        status,
      }
    );
    const address = await this.addressRepository.updateAddressById(
      request.body.addressID,
      {
        countryID,
        cityID,
        street,
        districtID: regionID,
        status,
      }
    );
    if(!address.modifiedCount || !phone.modifiedCount){
      logger.warn(`${CustomerService.name}.updateCustomer -- BadRequest`);
      throw ApiError.BadRequest();
    }
    const result = await this.customerRepository.updateCustomerById(
      id,
      request.body
    );
    if (!result.modifiedCount) {
      logger.warn(`${CustomerService.name}.updateCustomer -- BadRequest`);
      throw ApiError.BadRequest();
    }
    logger.debug(`${CustomerService.name}.updateCustomer -- success`);
    return result;
  }

  public async deleteCustomer(request: Request) {
    logger.debug(`${CustomerService.name}.deleteCustomer -- start`);
    const { id } = request.params;
    const customer = await this.customerRepository.findCustomerById(id);
    if (!customer) {
      logger.error(`${CustomerService.name}.deleteCustomer -- Not Found`);
      throw ApiError.NotFoundException();
    }
    request.body.phoneID = customer.phoneID;
    request.body.addressID = customer.addressID;
    await this.phoneRepository.deletePhone(request.body.phoneID);
    await this.addressRepository.deleteAddress(request.body.addressID);
    
    const result = await this.customerRepository.deleteCustomer(id);
    if(!result.modifiedCount){
      logger.warn(`${CustomerService.name}.deleteCustomer -- BadRequest`);
      throw ApiError.BadRequest();
    }
    logger.debug(`${CustomerService.name}.deleteCustomer -- success`);
    return result;
  }

  public async getCustomer(request: Request) {
    logger.debug(`${CustomerService.name}.getCustomer -- start`);
    const { id } = request.params;
    const result = await this.customerRepository.findCustomerById(id);
    if (!result) {
      logger.warn(`${CustomerService.name}.getCustomer -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    const data = new CustomerHelper(result);
    logger.debug(`${CustomerService.name}.getCustomer -- success`);
    return data;
  }

  public async getCustomers() {
    logger.debug(`${CustomerService.name}.getCustomers -- start`);
    const result = await this.customerRepository.findCustomers();
    if (!isEmptyArray(result)) {
      logger.warn(`${CustomerService.name}.getCustomers -- NoContentException`);
      throw ApiError.NoContentException();
    }
    let data: CustomerHelper[] = [];
    for (const key in result) {
      data.push(new CustomerHelper(result[key]));
    }
    logger.debug(`${CustomerService.name}.getCustomers -- success`);
    return data;
  }
}

export default CustomerService;

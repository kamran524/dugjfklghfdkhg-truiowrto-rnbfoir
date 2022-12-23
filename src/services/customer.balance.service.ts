import { Request } from "express";
import { ApiError } from "../errors/api.error";
import CustomerBalanceHelper from "../helper/customer.balance.helper";
import logger from "../log/winston";
import { CustomerBalanceRepository } from "../repository/customer.balance.repository";

export class CustomerBalanceService {
  private readonly CustomerBalanceRepository: CustomerBalanceRepository;

  constructor() {
    this.CustomerBalanceRepository = new CustomerBalanceRepository();
  }

  public async createCustomerBalance(request: Request) {
    logger.debug(`${CustomerBalanceService.name}.createCustomerBalance -- start`);
    const customerBalance = await this.CustomerBalanceRepository.createCustomerBalance(request.body);
    logger.debug(`${CustomerBalanceService.name}.createCustomerBalance -- success`);
    return customerBalance;
  }

  public async getCustomerBalances() {
    logger.debug(`${CustomerBalanceService.name}.getCustomerBalances -- start`);
    const customerBalances = await this.CustomerBalanceRepository.findCustomerBalances();
    if (!customerBalances || customerBalances.length == 0) {
      logger.error(`${CustomerBalanceService.name}.getCustomerBalances -- no content`)
      throw ApiError.NotFoundException("No customerBalances found!")
    }
    let data: CustomerBalanceHelper[] = []
    for (const key in customerBalances) data.push(new CustomerBalanceHelper(customerBalances[key]));
    logger.debug(`${CustomerBalanceService.name}.getCustomerBalances -- success`);
    return data;
  }

  public async getCustomerBalance(request: Request) {
    logger.debug(`${CustomerBalanceService.name}.getcustomerBalance -- start`);
    const { id } = request.params;
    const customerBalance = await this.CustomerBalanceRepository.findCustomerBalanceById(id);
    if (!customerBalance) {
      logger.error(`${CustomerBalanceService.name}.getcustomerBalance -- not found`);
      throw ApiError.NotFoundException(`CustomerBalance with id ${id} not found!`);
    }
    const data = new CustomerBalanceHelper(customerBalance);
    logger.debug(`${CustomerBalanceService.name}.getcustomerBalance -- success`);
    return data;
  }

  public async updateCustomerBalance(request: Request) {
    logger.debug(`${CustomerBalanceService.name}.updateCustomerBalance -- start`);
    const { id } = request.body;
    const result = await this.CustomerBalanceRepository.findCustomerBalanceByIdAndUpdate(
      id,
      request.body
    );
    if (result.matchedCount == 0) {
      logger.error(`${CustomerBalanceService.name}.updateCustomerBalance -- not found`);
      throw ApiError.NotFoundException(`CustomerBalance with id ${id} not found!`);
    } else if (result.matchedCount == 0 && result.modifiedCount == 0) {
      logger.error(`${CustomerBalanceService.name}.updateCustomerBalance -- not updated`);
      throw ApiError.ServiceUnavailableException("CustomerBalance could not be updated!");
    }
    logger.debug(`${CustomerBalanceService.name}.updateCustomerBalance -- success`);
    return result;
  }

  public async deleteCustomerBalance(request: Request) {
    logger.debug(`${CustomerBalanceService.name}.deleteCustomerBalance -- start`);
    const { id } = request.params;
    const result = await this.CustomerBalanceRepository.findCustomerBalanceByIdAndDelete(id);
    if (!result.acknowledged) {
      logger.error(`${CustomerBalanceService.name}.deleteCustomerBalance -- not deleted`);
      throw ApiError.ServiceUnavailableException("CustomerBalance could not be deleted!");
    } else if (result.deletedCount == 0) {
      logger.debug(`${CustomerBalanceService.name}.deleteCustomerBalance -- not found`);
      throw ApiError.NotFoundException(`CustomerBalance with id ${id} not found!`);
    }
    logger.debug(`${CustomerBalanceService.name}.deleteCustomerBalance -- success`);
    return result;
  }
}

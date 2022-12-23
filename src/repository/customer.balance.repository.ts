import { CustomerBalanceModel } from "../models/customerBalance.model";
import { ICustomerBalance } from "../models/interfaces/customerBalance.interface";
import logger from "../log/winston";

export class CustomerBalanceRepository {
  constructor() {}

  public async createCustomerBalance(data: ICustomerBalance) {
    logger.debug(`${CustomerBalanceRepository.name}.createCustomerBalance -- start`);
    const result = await CustomerBalanceModel.create(data);
    logger.debug(`${CustomerBalanceRepository.name}.createCustomerBalance -- success`);
    return result;
  }

  public async findCustomerBalances() {
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalances -- start`);
    const customerBalances = await CustomerBalanceModel.find({}).lean();
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalances -- success`);
    return customerBalances;
  }

  public async findCustomerBalanceById(id: string) {
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalances -- start`);
    const customerBalance = await CustomerBalanceModel.findById(id);
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalances -- success`);
    return customerBalance;
  }

  public async findCustomerBalanceByIdAndUpdate(id: string, body: ICustomerBalance) {
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalanceByIdAndUpdate -- start`);
    const updatedCustomerBalance = await CustomerBalanceModel.updateOne({ _id: id }, body);
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalanceByIdAndUpdate -- success`);
    return updatedCustomerBalance;
  }

  public async findCustomerBalanceByIdAndDelete(id: string) {
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalanceByIdAndDelete -- start`);
    const deletedCustomerBalance = await CustomerBalanceModel.deleteOne({ _id: id });
    logger.debug(`${CustomerBalanceRepository.name}.findCustomerBalanceByIdAndDelete -- success`);
    return deletedCustomerBalance;
  }
}

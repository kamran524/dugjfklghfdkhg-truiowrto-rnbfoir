import { Schema } from "mongoose";
import { ICustomerBalance } from "../models/interfaces/customerBalance.interface";

class CustomerBalanceHelper {
    customerID: Schema.Types.ObjectId;
    orderBalance: number;
    deliveryBalance: number;
    status: boolean;

    constructor(model: ICustomerBalance) {
      this.customerID = model.customerID;
      this.orderBalance = model.orderBalance;
      this.deliveryBalance = model.deliveryBalance;
      this.status = model.status;
    }
  }
  
  export default CustomerBalanceHelper;

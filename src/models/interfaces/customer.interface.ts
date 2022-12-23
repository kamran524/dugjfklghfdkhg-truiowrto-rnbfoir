import { Model, Schema } from "mongoose";
import {ENUMS} from "../../enum/enums";

export interface ICustomer {
  _id?: Schema.Types.ObjectId;
  customerCode?: string;
  firstName: string;
  lastName: string;
  gender: typeof ENUMS.GENDER;
  citizenship:  typeof ENUMS.CITIZENSHIP;
  birthDate: Date;
  passportSerial: string;
  email: string;
  passportFIN: string;
  password: string;
  passwordConfirm?:string;
  phoneID: Schema.Types.ObjectId;
  branchID: Schema.Types.ObjectId;
  addressID: Schema.Types.ObjectId;
  balanceID?: Schema.Types.ObjectId;
  discountID?: Schema.Types.ObjectId;
  isEmailVerified?: boolean;
  status?: boolean;
}

export interface ICustomerModel extends Model<ICustomer> {
  build(args: ICustomer): ICustomer;
}


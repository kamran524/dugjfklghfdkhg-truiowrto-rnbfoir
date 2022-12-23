import { Schema } from "mongoose";
import { ENUMS } from "../enum/enums";
import { ICustomer } from "../models/interfaces/customer.interface";

class CustomerHelper {
    id: Schema.Types.ObjectId;
    customerCode: string;
    firstName: string;
    lastName: string;
    gender: typeof ENUMS.GENDER;
    citizenship: typeof ENUMS.CITIZENSHIP;
    birthDate: Date;
    passportSerial: string;
    email: string;
    passportFIN: string;
    phoneID: Schema.Types.ObjectId;
    branchID: Schema.Types.ObjectId;
    addressID: Schema.Types.ObjectId;
    isEmailVerified: boolean;

    constructor(model: ICustomer) {
      this.id = model._id;
      this.customerCode = model.customerCode;
      this.firstName = model.firstName;
      this.lastName = model.lastName;
      this.gender = model.gender;
      this.citizenship = model.citizenship;
      this.birthDate = model.birthDate;
      this.passportSerial = model.passportSerial;
      this.email = model.email;
      this.passportFIN = model.passportFIN;
      this.phoneID = model.phoneID;
      this.addressID = model.addressID;
      this.branchID = model.branchID;
      this.isEmailVerified = model.isEmailVerified;
    }
  }
  
  export default CustomerHelper;
  
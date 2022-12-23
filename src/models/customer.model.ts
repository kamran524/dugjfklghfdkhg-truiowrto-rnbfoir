import { Schema, model } from "mongoose";
import { ICustomer, ICustomerModel } from "./interfaces/customer.interface";
import {ENUMS} from "../enum/enums";

const customerSchema = new Schema<ICustomer>(
  {
    customerCode: {
      type: String,
      immutable: true,
      unique: true,
    },
    firstName: {
      type: String,
      maxlength: 30,
      required: true,
    },
    lastName: {
      type: String,
      maxlength: 30,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum:ENUMS.GENDER
    },
    citizenship: {
      type: String,
      required: true,
      enum:ENUMS.CITIZENSHIP
    },
    birthDate: {
      type: Date,
      required: true,
    },
    passportSerial: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passportFIN: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneID: {
      type: Schema.Types.ObjectId,
      ref: "Phone",
      required: true,
    },
    branchID: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    addressID: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    balanceID: {
      type: Schema.Types.ObjectId,
      ref: "Balance"
    },
    discountID: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const CustomerModel = model<ICustomer, ICustomerModel>(
  "Customer",
  customerSchema
);

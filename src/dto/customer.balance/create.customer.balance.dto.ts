import {
    IsNotEmpty,
    IsMongoId,
    IsNumber,
    IsString,
    IsBoolean,
  } from "class-validator";
  
  
  export class CreateCustomerBalanceDto{
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    customerID:string
  
    @IsNotEmpty()
    @IsNumber()
    orderBalance:number

    @IsNotEmpty()
    @IsNumber()
    deliveryBalance:number

    @IsBoolean()
    status:boolean;
  
  }
  
  
  
  
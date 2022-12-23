import {
    IsNotEmpty,
    IsMongoId,
    IsNumber,
    IsBoolean,
    IsOptional,
  } from "class-validator";
  
  
  export class UpdateCustomerBalanceDto{
    @IsNotEmpty()
    @IsMongoId()
    id:string

    @IsOptional()
    @IsNumber()
    orderBalance:number

    @IsOptional()
    @IsNumber()
    deliveryBalance:number 

    @IsOptional()
    @IsBoolean()
    status:boolean;
  
  }
  
  
  

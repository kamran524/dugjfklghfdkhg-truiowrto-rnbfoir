import {IsMongoId, IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class UpdatePhoneOperatorCodeDto{

  @IsMongoId()
  @IsNotEmpty()
  id:string

  @IsOptional()
  @IsNumber()
  code:string;

  @IsOptional()
  @IsMongoId()
  countryID:string;
}

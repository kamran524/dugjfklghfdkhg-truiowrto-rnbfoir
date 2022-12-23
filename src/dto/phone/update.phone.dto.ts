import {IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdatePhoneDto{

  @IsMongoId()
  @IsNotEmpty()
  id:string

  @IsOptional()
  @IsString()
  @IsMongoId()
  countryCodeID:string

  @IsOptional()
  @IsString()
  @IsMongoId()
  operatorCodeID:string

  @IsOptional()
  @IsNumber()
  number:number
}

import {
  IsNotEmpty,
  IsMongoId,
  IsString,
} from "class-validator";


export class CreatePhoneDto{
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  countryCodeID:string

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  operatorCodeID:string

  @IsNotEmpty()
  @IsString()
  number:number

}




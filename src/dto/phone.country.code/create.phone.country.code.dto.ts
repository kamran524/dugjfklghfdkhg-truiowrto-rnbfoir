import {
  IsNotEmpty,
  IsMongoId, IsNumber
} from "class-validator";


export class CreatePhoneCountryCodeDto{

  @IsNotEmpty()
  @IsNumber()
  code:string;

  @IsNotEmpty()
  @IsMongoId()
  countryID:string;

}


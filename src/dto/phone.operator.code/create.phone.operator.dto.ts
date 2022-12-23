import {
  IsNotEmpty,
  IsMongoId,
  IsNumber,
} from "class-validator";


export class CreatePhoneOperatorCodeDto{
  @IsNotEmpty()
  @IsNumber()
  code:string;

  @IsNotEmpty()
  @IsMongoId()
  countryID:string;
}




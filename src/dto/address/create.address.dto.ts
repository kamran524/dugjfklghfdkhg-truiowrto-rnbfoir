import {
  IsNotEmpty,
  IsMongoId,
  IsString,
  Matches,
} from "class-validator";


export class CreateAddressDto{

  @IsNotEmpty()
  @IsMongoId()
  countryID:string;

  @IsNotEmpty()
  @IsMongoId()
  cityID:string;

  @IsNotEmpty()
  @IsMongoId()
  districtID:string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9 -]*$/)
  street:string;
}




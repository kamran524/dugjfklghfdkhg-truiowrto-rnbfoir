import {
  IsNotEmpty,
  Length,
  IsAlpha,
  IsMongoId
} from "class-validator";

export class CreateCityDto{
  @IsNotEmpty()
  @Length(2,30)
  @IsAlpha()
  name:string;

  @IsNotEmpty()
  @IsMongoId()
  countryID : string;

}


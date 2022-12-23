import {
  IsNotEmpty,
  Length,
  IsAlpha
} from "class-validator";

export class CreateCountryDto {
  @IsNotEmpty()
  @Length(2,30)
  @IsAlpha()
  name:string;

  @IsNotEmpty()
  @Length(0,30)
  @IsAlpha()
  alpha2code:string;

  @IsNotEmpty()
  @Length(0,30)
  @IsAlpha()
  alpha3code:string;
}


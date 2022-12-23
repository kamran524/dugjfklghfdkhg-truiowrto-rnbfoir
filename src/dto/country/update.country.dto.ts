import {IsAlpha, IsMongoId, IsNotEmpty, IsOptional, Length} from "class-validator";

export class UpdateCountryDto {
  @IsNotEmpty()
  @IsMongoId()
  id:string;

  @Length(2,30)
  @IsAlpha()
  @IsOptional()
  name:string;

  @Length(0,30)
  @IsAlpha()
  @IsOptional()
  alpha2code:string;

  @Length(0,30)
  @IsAlpha()
  @IsOptional()
  alpha3code:string;
}

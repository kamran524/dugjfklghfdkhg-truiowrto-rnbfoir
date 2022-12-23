import {IsMongoId, IsNotEmpty, IsOptional, IsString, Matches} from "class-validator";

export class UpdateAddressDto{

  @IsNotEmpty()
  @IsMongoId()
  id:string;

  @IsOptional()
  @IsMongoId()
  countryID:string;

  @IsOptional()
  @IsMongoId()
  cityID:string;

  @IsOptional()
  @IsMongoId()
  regionID:string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9 -]*$/)
  street:string;
}

import {
  IsNotEmpty,
  Length,
  IsAlpha,
  IsMongoId
} from "class-validator";

export class CreateDistrictDto{
  @IsNotEmpty()
  @Length(2,30)
  @IsAlpha()
  name:string;

  @IsNotEmpty()
  @IsMongoId()
  cityID: string;
}

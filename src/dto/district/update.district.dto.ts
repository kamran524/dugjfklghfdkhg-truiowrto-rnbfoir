import {IsAlpha, IsMongoId, IsNotEmpty, Length} from "class-validator";

export class UpdateDistrictDto{
  @IsNotEmpty()
  @IsMongoId()
  id:string;

  @IsNotEmpty()
  @Length(2,30)
  @IsAlpha()
  name:string;
}

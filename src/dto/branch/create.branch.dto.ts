import {
  IsNotEmpty,
  Length,
  IsAlpha,
  IsMongoId, IsString,
} from "class-validator";


export class CreateBranchDto {

  @IsNotEmpty()
  @Length(2,30)
  @IsAlpha()
  code:string;

  @IsMongoId()
  cityID:string;

  @IsMongoId()
  regionID:string;

  @IsString()
  street:string;
}


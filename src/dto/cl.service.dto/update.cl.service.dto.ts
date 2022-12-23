import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateClServiceDto{

  @IsNotEmpty()
  @IsMongoId()
  id:string

  @IsOptional()
  title:string;

  @IsOptional()
  content:string;

  @IsOptional()
  @IsBoolean()
  status:boolean;
}

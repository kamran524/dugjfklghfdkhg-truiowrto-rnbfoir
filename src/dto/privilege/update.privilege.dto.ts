import { Schema } from "mongoose";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePrivilegeDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code: string;
}

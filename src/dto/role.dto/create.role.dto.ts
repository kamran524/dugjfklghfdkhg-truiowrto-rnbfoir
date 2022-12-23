import { Schema } from "mongoose";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId({ each: true })
  privileges?: Schema.Types.ObjectId[];
}

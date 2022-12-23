import { Schema } from "mongoose";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsMongoId()
  id: Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsMongoId({ each: true })
  privileges?: Schema.Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

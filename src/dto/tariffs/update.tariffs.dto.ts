import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ENUMS } from "../../enum/enums";

export class UpdateTariffDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsNumber()
  minWeight?: number;

  @IsOptional()
  @IsNumber()
  maxWeight?: number;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  @IsEnum(ENUMS.TARIFF_TYPE)
  type?: typeof ENUMS.TARIFF_TYPE & string;

  @IsOptional()
  @IsMongoId()
  country?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

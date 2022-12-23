import { ENUMS } from "../../enum/enums";
import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTariffDto {
  @IsNotEmpty()
  @IsNumber()
  minWeight: number;

  @IsNotEmpty()
  @IsNumber()
  maxWeight: number;

  @IsNotEmpty()
  @IsNumber()
  volume: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ENUMS.TARIFF_TYPE)
  type: typeof ENUMS.TARIFF_TYPE & string;

  @IsNotEmpty()
  @IsMongoId()
  country: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

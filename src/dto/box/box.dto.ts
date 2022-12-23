import {
  ArrayNotEmpty,
  IsAlphanumeric,
  IsNumberString,
  IsArray,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
} from "class-validator";

export class BoxDto {
  @IsAlphanumeric()
  @Matches(/^FEX\d{10}/)
  @IsNotEmpty()
  barcode: string;

  @IsArray()
  @ArrayNotEmpty()
  @Length(24, 24, { each: true })
  ordersID: string[];

  @IsNotEmpty()
  @IsNumberString()
  totalWeight: string;

  @IsOptional()
  status?: boolean;
}

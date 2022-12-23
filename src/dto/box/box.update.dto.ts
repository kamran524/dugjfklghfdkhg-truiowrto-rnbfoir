import {
  IsAlphanumeric,
  IsNumberString,
  IsArray,
  Length,
  Matches,
  IsOptional,
  IsNotEmpty,
  IsMongoId,
} from "class-validator";

export class BoxUpdateDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsAlphanumeric()
  @Matches(/^FEX\d{10}/)
  barcode?: string;

  @IsOptional()
  @IsArray()
  @Length(24, 24, { each: true })
  ordersID?: string[];

  @IsOptional()
  @IsNumberString()
  totalWeight?: string;

  @IsOptional()
  status?: boolean;
}
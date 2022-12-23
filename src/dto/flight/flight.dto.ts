import {
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  Length,
  IsOptional
} from "class-validator";

export class FlightDto {
  @IsNotEmpty()
  @IsMongoId()
  from: string;

  @IsNotEmpty()
  @IsMongoId()
  to: string;

  @IsNotEmpty()
  // ISO8601 = (YYYY-MM-DD)
  @IsISO8601()
  flightDate: Date;

  @IsOptional()
  // ISO8601 = (YYYY-MM-DD)
  @IsISO8601()
  landingDate?: Date;

  @IsArray()
  @ArrayNotEmpty()
  @Length(24, 24, {
    each: true,
  })
  boxIDs: string[];

  @IsNotEmpty()
  @IsNumberString()
  totalWeight: number;

  @IsOptional()
  isCompleted?: boolean;
}

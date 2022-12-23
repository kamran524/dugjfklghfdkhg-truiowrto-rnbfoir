import {
  IsArray,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from "class-validator";

export class FlightUpdateDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsMongoId()
  from?: string;

  @IsOptional()
  @IsMongoId()
  to?: string;

  @IsOptional()
  // ISO8601 = (YYYY-MM-DD)
  @IsISO8601()
  flightDate?: Date;
  
  @IsOptional()
  // ISO8601 = (YYYY-MM-DD)
  @IsISO8601()
  landingDate?: Date;

  @IsOptional()
  @IsArray()
  @Length(24, 24, {
    each: true,
  })
  boxIDs?: string[];

  @IsOptional()
  @IsNumberString()
  totalWeight?: number;

  @IsOptional()
  isCompleted?: boolean;
}

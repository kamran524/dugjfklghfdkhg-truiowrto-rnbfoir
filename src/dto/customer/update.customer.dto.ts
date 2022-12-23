import {ENUMS} from "../../enum/enums";
import {
  IsNotEmpty,
  Length,
  IsAlpha,
  IsEnum,
  IsDate,
  MinLength,
  MaxLength,
  IsAlphanumeric,
  IsMongoId, IsEmail, IsUppercase, IsNumber, IsString, IsOptional, isBoolean, IsDateString, IsNumberString,
} from "class-validator";


export class UpdateCustomerDto {
    
  @IsMongoId()
  @IsNotEmpty()
  id:string

  @IsOptional()
  @Length(2,30)
  @IsAlpha()
  firstName:string;

  @IsOptional()
  @Length(2,30)
  @IsAlpha()
  lastName:string;

  @IsEnum(ENUMS.GENDER)
  @IsOptional()
  gender:typeof ENUMS.GENDER

  @IsEnum(ENUMS.CITIZENSHIP)
  @IsOptional()
  citizenship:typeof ENUMS.CITIZENSHIP

  @IsDateString()
  @IsOptional()
  birthDate:Date;

  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(8)
  @IsOptional()
  passportSerial:string;

  @IsUppercase()
  @MinLength(7)
  @MaxLength(7)
  @IsOptional()
  passportFIN:string;

  @IsEmail()
  @IsOptional()
  email:string;

  @MaxLength(30)
  @MinLength(0)
  @IsOptional()
  password:string;

  @IsMongoId()
  @IsOptional()
  countryCodeID?:string;

  @IsMongoId()
  @IsOptional()
  operatorCodeID:string

  @MinLength(7)
  @MaxLength(7)
  @IsNumberString()
  @IsOptional()
  number: number;

  @IsMongoId()
  @IsOptional()
  branchID:string;

  @IsMongoId()
  @IsOptional()
  cityID:string;

  @IsOptional()
  isEmailVerified:boolean;

  @IsOptional()
  status:boolean;

  @IsMongoId()
  @IsOptional()
  countryID:string;

  @IsMongoId()
  @IsOptional()
  regionID:string;

  @IsString()
  @IsOptional()
  street:string;
}


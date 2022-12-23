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
  Validate, IsMongoId, IsEmail, IsUppercase, IsNumber, IsString, IsDateString, IsNumberString,
} from "class-validator";


export class CreateCustomerDto {
  @IsNotEmpty({message:""})
  @Length(2,30)
  @IsAlpha()
  firstName:string;

  @IsNotEmpty({message:""})
  @Length(2,30)
  @IsAlpha()
  lastName:string;

  @IsEnum(ENUMS.GENDER)
  @IsNotEmpty()
  gender:typeof ENUMS.GENDER

  @IsEnum(ENUMS.CITIZENSHIP)
  @IsNotEmpty()
  citizenship:typeof ENUMS.CITIZENSHIP

  @IsDateString()
  @IsNotEmpty()
  birthDate:Date;

  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(8)
  @IsNotEmpty()
  passportSerial:string;

  @IsUppercase()
  @MinLength(7)
  @MaxLength(7)
  @IsNotEmpty()
  passportFIN:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

  @MaxLength(30)
  @MinLength(0)
  @IsNotEmpty()
  password:string;

  @Validate(CreateCustomerDto, ['password'])
  @IsNotEmpty()
  passwordConfirm: string | undefined;

  @IsMongoId()
  @IsNotEmpty()
  countryCodeID?:string;

  @IsMongoId()
  @IsNotEmpty()
  operatorCodeID:string

  @MinLength(7)
  @MaxLength(7)
  @IsNumberString()
  @IsNotEmpty()
  number: number;

  @IsMongoId()
  branchID:string;

  @IsMongoId()
  cityID:string;

  
  @IsMongoId()
  countryID:string;

  @IsMongoId()
  regionID:string;

  @IsString()
  street:string;
}


import {
    IsNotEmpty,
    Length,
    IsAlpha,
    IsMongoId
  } from "class-validator";

export class CreateShopDto {
   @IsNotEmpty()
   @Length(2,30)
   @IsAlpha()
   productCategory:string;

   @IsNotEmpty()
   @Length(2,30)
   @IsAlpha()
   title:string
}
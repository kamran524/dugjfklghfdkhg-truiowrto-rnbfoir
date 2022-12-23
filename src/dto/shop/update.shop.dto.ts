import {IsAlpha, isMongoId, IsMongoId, isNotEmpty, IsNotEmpty, IsOptional, Length} from "class-validator";


export class UpdateShopDto {
    @IsNotEmpty()
    @IsMongoId()
    id:string;

    @Length(2,30)
    @IsAlpha()
    @IsOptional()
    title:string

    @Length(2,30)
    @IsAlpha()
    productCategory:string;
}
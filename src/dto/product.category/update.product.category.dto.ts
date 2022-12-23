import { IsAlpha, IsMongoId, IsNotEmpty } from "class-validator";

export class UpdateProductCategoryDto {
    @IsNotEmpty()
    @IsMongoId()
    id:string;

    @IsNotEmpty()
    @IsAlpha()
    category:string;
}
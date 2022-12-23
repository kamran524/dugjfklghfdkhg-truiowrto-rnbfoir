import { IsAlpha, IsNotEmpty } from "class-validator";

export class CreateProductCategoryDto {
    @IsNotEmpty({message:""})
    @IsAlpha()
    category:string;
}
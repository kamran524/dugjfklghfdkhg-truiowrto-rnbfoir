import {IsAlpha, IsMongoId,IsBoolean, isNotEmpty, IsNotEmpty, IsOptional, Length} from "class-validator";


export class UpdateForbiddenProductDto {
    @IsNotEmpty()
    @IsMongoId()
    id:string

    @Length(2,30)
    @IsAlpha()
    title:string

    @Length(2,30)
    @IsAlpha()
    description:string

    @Length(2,30)
    @IsAlpha()
    content:string

    @IsBoolean()
    status:boolean    
}
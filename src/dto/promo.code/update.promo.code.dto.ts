import { IsAlpha, IsDateString, IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class UpdatePromoCodeDto {
    @IsNotEmpty()
    @IsMongoId()
    id:string;

    @IsOptional()
    @Length(10)
    @IsString()
    code:string;
    
    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsNumberString()
    discount:number;

    @IsOptional()
    @IsMongoId()
    tariffID: string;

    @IsOptional()
    @IsDateString()
    startDate:Date;

    @IsOptional()
    @IsDateString()
    endDate:Date;
}
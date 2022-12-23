import { IsAlpha, IsDateString, IsMongoId, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class CreatePromoCodeDto {
    @IsNotEmpty({message:""})
    @Length(10)
    @IsString()
    code:string;
    
    @IsNotEmpty({message:""})
    @IsString()
    name:string;

    @IsNotEmpty({message:""})
    @IsNumberString()
    discount:number;

    @IsNotEmpty()
    @IsMongoId()
    tariffID: string;

    @IsNotEmpty({message:""})
    @IsDateString()
    startDate:Date;

    @IsNotEmpty({message:""})
    @IsDateString()
    endDate:Date;
}
import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";


export class UpdateCampaignDto {
    @IsNotEmpty()
    @IsMongoId()
    id:string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsMongoId()
    tariffID: string;

    @IsOptional()
    @IsNumberString()
    discount: number;

    @IsOptional()
    @IsDateString()
    startDate: Date;
    
    @IsOptional()
    @IsDateString()
    endDate:Date;

    @IsOptional()
    @IsBoolean()
    status:boolean;
  
    @IsOptional()
    @IsBoolean()
    isFixOrPerson:boolean;
}
 
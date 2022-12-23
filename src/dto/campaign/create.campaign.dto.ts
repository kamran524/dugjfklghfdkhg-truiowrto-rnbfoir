import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsNumberString, IsString } from "class-validator";


export class CreateCampaignDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsMongoId()
    tariffID: string;

    @IsNotEmpty()
    @IsNumberString()
    discount: number;

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;
    
    @IsNotEmpty()
    @IsDateString()
    endDate:Date; 
    
    @IsNotEmpty()
    @IsBoolean()
    isFixOrPerson:Date; 
}
 
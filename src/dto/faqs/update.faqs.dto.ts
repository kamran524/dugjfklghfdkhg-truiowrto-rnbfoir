import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateFaqsDto {
    @IsNotEmpty()
    @IsMongoId()
    id:string;
    
    @IsOptional()
    @IsString()
    question:string;

    @IsOptional()
    @IsString()
    answer:string;

    @IsOptional()
    @IsBoolean()
    status:boolean;
}
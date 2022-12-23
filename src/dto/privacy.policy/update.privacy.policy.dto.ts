import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePrivactPolicyDto{
    @IsNotEmpty()
    @IsMongoId()
    id:string;

    @IsOptional()
    @IsString()
    title:string;

    @IsOptional()
    @IsArray()
    contentList:[string[]];
    
    @IsOptional()
    @IsArray()
    sectionList:[string[]];
    
    @IsOptional()
    @IsBoolean()
    status:boolean;
}
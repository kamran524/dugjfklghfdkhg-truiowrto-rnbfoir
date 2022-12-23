import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePrivactPolicyDto{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsArray()
    contentList:[string[]];
    
    @IsOptional()
    @IsArray()
    sectionList:[string[]];
}
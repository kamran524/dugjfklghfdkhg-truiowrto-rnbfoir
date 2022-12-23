import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Mixed } from "mongoose";

export class UpdateUserAgreementDto{
    @IsNotEmpty()
    @IsMongoId()
    id:string;

    @IsOptional()
    contentList:Mixed;
    
    @IsOptional()
    @IsBoolean()
    status:boolean;
}
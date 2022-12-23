import {  IsNotEmpty, IsString } from "class-validator";
import { Mixed } from "mongoose";

export class CreateUserAgreementDto{
    @IsNotEmpty()
    content:Mixed;
}
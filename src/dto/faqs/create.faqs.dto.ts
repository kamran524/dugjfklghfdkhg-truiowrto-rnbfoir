import { IsNotEmpty, IsString } from "class-validator";

export class CreateFaqsDto {
    @IsNotEmpty({message:""})
    @IsString()
    question:string;

    @IsNotEmpty({message:""})
    @IsString()
    answer:string;
}
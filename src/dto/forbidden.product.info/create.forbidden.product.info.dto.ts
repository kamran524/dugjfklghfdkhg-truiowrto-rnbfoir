import {
    IsNotEmpty,
    Length,
    IsString,
    IsMongoId
} from 'class-validator';

export class CreateForbiddenProductDto {
    @IsNotEmpty()
    @Length(2,30)
    @IsString()
    title:string

    @IsNotEmpty()
    @Length(2,30)
    @IsString()
    description:string
    
    @IsNotEmpty()
    @Length(2,30)
    content:string
}
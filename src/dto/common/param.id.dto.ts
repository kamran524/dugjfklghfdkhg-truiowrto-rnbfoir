import {
  IsNotEmpty,
  IsMongoId
} from "class-validator";

export class ParamIdDto{
  @IsNotEmpty()
  @IsMongoId()
  id:string;
}


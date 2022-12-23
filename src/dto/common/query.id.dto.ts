
import {
  IsNotEmpty,
  IsMongoId
} from "class-validator";


export class QueryIdDto{

  @IsNotEmpty()
  @IsMongoId()
  firstName:string;

}


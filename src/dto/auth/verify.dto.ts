import { IsJWT, IsNotEmpty } from "class-validator";


export class VerifyMailDto {
  @IsJWT()
  @IsNotEmpty()
  verifyToken: string;
}
 
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePrivilegeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}

import { IsEmail, IsNotEmpty, IsString, isStrongPassword } from "class-validator";

export class CreateUserDto {
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
 // @isStrongPassword()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  nickname: string;
}

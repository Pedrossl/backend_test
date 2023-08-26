import { IsEmail, IsString, MaxLength } from 'class-validator';

export class UserSchema {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(70)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  password: string;
}

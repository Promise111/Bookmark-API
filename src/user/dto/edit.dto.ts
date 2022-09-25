import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

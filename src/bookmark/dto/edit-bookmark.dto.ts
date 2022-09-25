import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class EditBookmark {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly en: string;

  @IsNotEmpty()
  @IsString()
  readonly am: string;

  @IsNotEmpty()
  @IsString()
  readonly ru: string;
}

import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  Min,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @Type(() => Object)
  @ValidateNested()
  readonly name: Record<string, string>;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  readonly imageFile: Express.Multer.File;

  @IsNotEmpty()
  @Type(() => Object)
  @ValidateNested()
  readonly description: Record<string, string>;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly category: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly priority: number;
}

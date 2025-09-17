import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateProductionOrderInput } from '../domain';

export class CreateProductionOrderDto implements CreateProductionOrderInput {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  reference: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsDateString()
  dueDate: string;
}



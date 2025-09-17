import { IsIn, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PRODUCTION_ORDER_STATUSES } from '../domain';
import type { ProductionOrderStatus } from '../domain';

export class FindProductionOrdersQueryDto {
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsIn(PRODUCTION_ORDER_STATUSES as unknown as string[])
  status?: ProductionOrderStatus;
}



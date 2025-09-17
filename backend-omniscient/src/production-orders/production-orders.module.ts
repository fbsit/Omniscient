import { Module } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { ProductionOrdersController } from './production-orders.controller';

@Module({
  providers: [ProductionOrdersService],
  controllers: [ProductionOrdersController],
})
export class ProductionOrdersModule {}



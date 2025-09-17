import { Module } from '@nestjs/common';
import { ProductionOrdersModule } from './production-orders/production-orders.module';

@Module({
  imports: [ProductionOrdersModule],
})
export class AppModule {}

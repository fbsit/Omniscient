import { Injectable } from '@nestjs/common';
import {
  CreateProductionOrderInput,
  ProductionOrder,
  ProductionOrderStatus,
  createProductionOrder,
} from './domain';

@Injectable()
export class ProductionOrdersService {
  private readonly orders: ProductionOrder[] = [];

  create(input: CreateProductionOrderInput): ProductionOrder {
    const order = createProductionOrder(input);
    this.orders.push(order);
    return order;
  }

  findAll(status?: ProductionOrderStatus): ProductionOrder[] {
    if (!status) return [...this.orders];
    return this.orders.filter((o) => o.status === status);
  }
}



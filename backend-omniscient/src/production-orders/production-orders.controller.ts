import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import type { ProductionOrder } from './domain';
import { FindProductionOrdersQueryDto } from './dto/find-production-orders.query';

@Controller('production-orders')
export class ProductionOrdersController {
  constructor(private readonly service: ProductionOrdersService) {}

  @Post()
  create(@Body() body: CreateProductionOrderDto): ProductionOrder {
    return this.service.create(body);
  }

  @Get()
  findAll(@Query() query: FindProductionOrdersQueryDto): ProductionOrder[] {
    return this.service.findAll(query.status);
  }
}



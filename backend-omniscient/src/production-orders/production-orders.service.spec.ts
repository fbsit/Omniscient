import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrdersService } from './production-orders.service';

describe('ProductionOrdersService', () => {
  let service: ProductionOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionOrdersService],
    }).compile();

    service = module.get<ProductionOrdersService>(ProductionOrdersService);
  });

  it('create then list returns the created order', () => {
    const created = service.create({
      reference: 'PO-001',
      product: 'Widget',
      quantity: 10,
      dueDate: new Date().toISOString(),
    });
    const all = service.findAll();
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject({
      id: expect.any(String),
      reference: 'PO-001',
      product: 'Widget',
      quantity: 10,
      status: 'planned',
      createdAt: expect.any(String),
    });
    expect(created.id).toBe(all[0].id);
  });
});



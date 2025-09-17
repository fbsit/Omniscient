import type { CreateProductionOrderInput, ProductionOrder, ProductionOrderStatus } from './types';

export const ordersApi = {
  async list(status?: ProductionOrderStatus): Promise<ProductionOrder[]> {
    const url = status ? `/api/production-orders?status=${encodeURIComponent(status)}` : '/api/production-orders';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  },
  async create(input: CreateProductionOrderInput): Promise<ProductionOrder> {
    const res = await fetch('/api/production-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create: ${res.status}`);
    return res.json();
  },
};



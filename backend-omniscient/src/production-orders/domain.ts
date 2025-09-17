import { randomUUID } from 'node:crypto';
export type ProductionOrderStatus =
  | 'planned'
  | 'scheduled'
  | 'in_progress'
  | 'completed';

export const PRODUCTION_ORDER_STATUSES = [
  'planned',
  'scheduled',
  'in_progress',
  'completed',
] as const;

export interface ProductionOrder {
  id: string;
  reference: string;
  product: string;
  quantity: number;
  dueDate: string; // ISO date string
  status: ProductionOrderStatus; // default planned
  createdAt: string; // ISO date string
}

export interface CreateProductionOrderInput {
  reference: string;
  product: string;
  quantity: number;
  dueDate: string; // ISO date string
}

export function createProductionOrder(
  input: CreateProductionOrderInput,
  clock: () => Date = () => new Date(),
  idFactory: () => string = () => randomUUID(),
): ProductionOrder {
  const now = clock();
  return {
    id: idFactory(),
    reference: input.reference,
    product: input.product,
    quantity: input.quantity,
    dueDate: input.dueDate,
    status: 'planned',
    createdAt: now.toISOString(),
  };
}



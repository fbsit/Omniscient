export type ProductionOrderStatus = 'planned' | 'scheduled' | 'in_progress' | 'completed';

export interface ProductionOrder {
  id: string;
  reference: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: ProductionOrderStatus;
  createdAt: string;
}

export interface CreateProductionOrderInput {
  reference: string;
  product: string;
  quantity: number;
  dueDate: string;
}



"use client";
import { useEffect, useState } from 'react';
import { App as AntdApp } from 'antd';
import { ordersApi } from '../../../lib/api';
import OrdersView from '../../organisms/orders/OrdersView';
import type { CreateProductionOrderInput, ProductionOrder, ProductionOrderStatus } from '../../../lib/types';

export default function OrdersContainer() {
  const { message, notification } = AntdApp.useApp();
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [allOrders, setAllOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ProductionOrderStatus | undefined>(undefined);
  const [textFilter, setTextFilter] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => { const t = setTimeout(() => setDebounced(textFilter), 300); return () => clearTimeout(t); }, [textFilter]);

  const applyText = (data: ProductionOrder[], text: string) => {
    if (!text) return data;
    const q = text.toLowerCase();
    return data.filter(o => o.reference.toLowerCase().includes(q) || o.product.toLowerCase().includes(q));
  };

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const data = await ordersApi.list(statusFilter);
      setAllOrders(data);
      setOrders(applyText(data, debounced));
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      notification.error({ message: 'Failed to load orders', description: msg, placement: 'bottomRight' });
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [statusFilter]);
  useEffect(() => { setOrders(applyText(allOrders, debounced)); }, [debounced, allOrders]);

  const handleCreate = async (input: CreateProductionOrderInput) => {
    setSubmitting(true);
    try {
      const created = await ordersApi.create(input);
      setAllOrders(prev => [created, ...prev]);
      setOrders(prev => [created, ...prev]);
      setIsModalOpen(false);
      message.success('Order created');
    } catch (e) {
      const msg = (e as Error).message;
      notification.error({ message: 'Failed to create order', description: msg, placement: 'bottomRight' });
    } finally { setSubmitting(false); }
  };

  return (
    <OrdersView
      orders={orders}
      loading={loading}
      textFilter={textFilter}
      statusFilter={statusFilter}
      isModalOpen={isModalOpen}
      submitting={submitting}
      onTextFilterChange={setTextFilter}
      onStatusFilterChange={setStatusFilter}
      onRefresh={load}
      onAdd={() => setIsModalOpen(true)}
      onCancelCreate={() => setIsModalOpen(false)}
      onCreate={handleCreate}
    />
  );
}




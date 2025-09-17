"use client";
import { useEffect, useMemo, useState } from 'react';
import Toolbar from './components/Toolbar';
import OrdersTable from './components/OrdersTable';
import Loading from '../components/Loading';
import CreateOrderModal from './components/CreateOrderModal';
import { App as AntdApp } from 'antd';
import { ordersApi } from '../lib/api';
import type { CreateProductionOrderInput, ProductionOrder, ProductionOrderStatus } from '../lib/types';

export default function OrdersContainer() {
  const { message } = AntdApp.useApp();
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
      setError((e as Error).message);
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
      message.error((e as Error).message);
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <main className="container">
        {loading && orders.length === 0 ? (
          <Loading message="Cargando órdenes..." fullScreen />
        ) : (
          <>
            <Toolbar
              textFilter={textFilter}
              onTextFilterChange={setTextFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              loading={loading}
              onRefresh={load}
              onAdd={() => setIsModalOpen(true)}
            />
            <OrdersTable orders={orders} loading={loading} />
            {error && <div style={{ color: 'red', marginTop: 8 }}>Error: {error}</div>}
          </>
        )}
      </main>

      {isModalOpen && (
        <CreateOrderModal
          open={isModalOpen}
          submitting={submitting}
          onCancel={() => setIsModalOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </>
  );
}



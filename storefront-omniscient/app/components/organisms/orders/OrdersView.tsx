"use client";
import Toolbar from '../../molecules/Toolbar';
import OrdersTable from '../../molecules/OrdersTable';
import Loading from '../../atoms/Loading';
import CreateOrderModal from '../../molecules/CreateOrderModal';
import type { CreateProductionOrderInput, ProductionOrder, ProductionOrderStatus } from '../../../lib/types';

export interface OrdersViewProps {
  orders: ProductionOrder[];
  loading: boolean;
  textFilter: string;
  statusFilter?: ProductionOrderStatus;
  isModalOpen: boolean;
  submitting: boolean;
  onTextFilterChange: (value: string) => void;
  onStatusFilterChange: (value: ProductionOrderStatus | undefined) => void;
  onRefresh: () => void;
  onAdd: () => void;
  onCancelCreate: () => void;
  onCreate: (input: CreateProductionOrderInput) => Promise<void> | void;
}

export default function OrdersView(props: OrdersViewProps) {
  const {
    orders,
    loading,
    textFilter,
    statusFilter,
    isModalOpen,
    submitting,
    onTextFilterChange,
    onStatusFilterChange,
    onRefresh,
    onAdd,
    onCancelCreate,
    onCreate,
  } = props;

  return (
    <>
      <main className="container">
        {loading && orders.length === 0 ? (
          <Loading message="Cargando órdenes..." fullScreen />
        ) : (
          <>
            <Toolbar
              textFilter={textFilter}
              onTextFilterChange={onTextFilterChange}
              statusFilter={statusFilter}
              onStatusFilterChange={onStatusFilterChange}
              loading={loading}
              onRefresh={onRefresh}
              onAdd={onAdd}
            />
            <OrdersTable orders={orders} loading={loading} />
          </>
        )}
      </main>

      {isModalOpen && (
        <CreateOrderModal
          open={isModalOpen}
          submitting={submitting}
          onCancel={onCancelCreate}
          onCreate={onCreate}
        />
      )}
    </>
  );
}




"use client";
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import dayjs from 'dayjs';
import type { ProductionOrder } from '../../lib/types';

export interface OrdersTableProps {
  orders: ProductionOrder[];
  loading: boolean;
}

export default function OrdersTable({ orders, loading }: OrdersTableProps) {
  const columns: ColumnsType<ProductionOrder> = [
    { title: 'Reference', dataIndex: 'reference', key: 'reference' },
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 100 },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', render: (v: string) => dayjs(v).format('YYYY-MM-DD') },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 140 },
    { title: 'Created', dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => dayjs(v).format('YYYY-MM-DD HH:mm') },
  ];

  return <Table rowKey={(r) => r.id} columns={columns} dataSource={orders} loading={loading} pagination={{ pageSize: 8 }} />;
}



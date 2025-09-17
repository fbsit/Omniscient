"use client";
import { Button, Input, Select, Space } from 'antd';
import type { ProductionOrderStatus } from '../../lib/types';

export interface ToolbarProps {
  textFilter: string;
  onTextFilterChange: (value: string) => void;
  statusFilter?: ProductionOrderStatus;
  onStatusFilterChange: (value: ProductionOrderStatus | undefined) => void;
  loading: boolean;
  onRefresh: () => void;
  onAdd: () => void;
}

export default function Toolbar(props: ToolbarProps) {
  const { textFilter, onTextFilterChange, statusFilter, onStatusFilterChange, loading, onRefresh, onAdd } = props;
  return (
    <div className="toolbar">
      <Space wrap>
        <Input allowClear placeholder="Search reference or product" value={textFilter} onChange={(e) => onTextFilterChange(e.target.value)} style={{ width: 280 }} />
        <Select
          allowClear
          placeholder="Status"
          style={{ width: 180 }}
          value={statusFilter}
          onChange={(v) => onStatusFilterChange(v as ProductionOrderStatus | undefined)}
          options={[
            { label: 'Planned', value: 'planned' },
            { label: 'Scheduled', value: 'scheduled' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
        <Button onClick={onRefresh} loading={loading}>Refresh</Button>
      </Space>
      <Button type="primary" onClick={onAdd}>Add Order</Button>
    </div>
  );
}




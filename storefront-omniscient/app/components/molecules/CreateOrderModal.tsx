"use client";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { CreateProductionOrderInput } from '../../lib/types';

export interface CreateOrderModalProps {
  open: boolean;
  submitting: boolean;
  onCancel: () => void;
  onCreate: (input: CreateProductionOrderInput) => Promise<void> | void;
}

type FormValues = { reference: string; product: string; quantity: number; dueDate: Dayjs };

export default function CreateOrderModal({ open, submitting, onCancel, onCreate }: CreateOrderModalProps) {
  const [form] = Form.useForm<FormValues>();

  const onFinish = async (v: FormValues) => {
    const payload: CreateProductionOrderInput = {
      reference: v.reference,
      product: v.product,
      quantity: v.quantity,
      dueDate: v.dueDate.toDate().toISOString(),
    };
    await onCreate(payload);
    form.resetFields();
  };

  return (
    <Modal title="Add Production Order" open={open} onCancel={onCancel} footer={null} destroyOnHidden>
      <Form form={form} layout="vertical" onFinish={onFinish} disabled={submitting} requiredMark initialValues={{ dueDate: dayjs() }}>
        <Form.Item name="reference" label="Reference" rules={[{ required: true, whitespace: true, message: 'Reference is required' }]}>
          <Input placeholder="e.g. PO-1234" />
        </Form.Item>
        <Form.Item name="product" label="Product" rules={[{ required: true, whitespace: true, message: 'Product is required' }]}>
          <Input placeholder="e.g. Widget X" />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: 'number', min: 1, message: 'Quantity must be positive' }]}>
          <InputNumber placeholder="e.g. 10" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Due date is required' }]}> 
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Space>
            <Button onClick={onCancel} disabled={submitting}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={submitting}>Add Order</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}




"use client";
import { Spin, Typography } from 'antd';

export default function Loading(props: { message?: string; fullScreen?: boolean }) {
  const { message, fullScreen } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullScreen ? 'calc(100vh - 64px)' : 200,
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Spin size="large" />
      {message && <Typography.Text type="secondary">{message}</Typography.Text>}
    </div>
  );
}



import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { App as AntdApp, ConfigProvider } from 'antd';
import userEvent from '@testing-library/user-event';
import Page from '../page';
import { HeaderContainer } from '../components/containers';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <AntdApp>
        <HeaderContainer />
        {children}
      </AntdApp>
    </ConfigProvider>
  );
}

describe('Orders Page', () => {
  beforeEach(() => {
    // Ensure fetch exists and is mockable in this environment
    Object.defineProperty(globalThis, 'fetch', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
    jest.clearAllMocks();
  });

  it('renders header and toolbar', async () => {
    // mock list empty
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [],
    });
    render(
      <Providers>
        <Page />
      </Providers>
    );
    expect(screen.getByText(/Omniscient/i)).toBeInTheDocument();
    // espera a que termine el primer fetch y se reemplace el loader
    await screen.findByRole('button', { name: /add order/i });
    expect(screen.getByPlaceholderText(/search reference or product/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add order/i })).toBeInTheDocument();
  });

  it('creates an order and shows it in table', async () => {
    (globalThis.fetch as jest.Mock)
      // first list
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => [] })
      // create
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          id: '1',
          reference: 'PO-1',
          product: 'Widget',
          quantity: 5,
          dueDate: new Date('2025-01-01').toISOString(),
          status: 'planned',
          createdAt: new Date('2025-01-01T00:00:00Z').toISOString(),
        }),
      });

    render(
      <Providers>
        <Page />
      </Providers>
    );
    // espera a que termine el primer fetch
    await screen.findByRole('button', { name: /add order/i });

    await userEvent.click(await screen.findByRole('button', { name: /add order/i }));
    await userEvent.type(await screen.findByLabelText(/reference/i), 'PO-1');
    await userEvent.type(screen.getByPlaceholderText(/widget x/i), 'Widget');
    const qty = screen.getByPlaceholderText(/e\.?g\.?\s*10/i);
    await userEvent.clear(qty);
    await userEvent.type(qty as HTMLInputElement, '5');
    const dialog = await screen.findByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: /^add order$/i }));

    await waitFor(() => expect(screen.getByText(/PO-1/i)).toBeInTheDocument());
    expect(screen.getByText(/Widget/i)).toBeInTheDocument();
  });
});



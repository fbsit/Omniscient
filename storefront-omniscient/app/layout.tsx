import type { Metadata } from "next";
import 'antd/dist/reset.css'
import { App as AntdApp, ConfigProvider } from 'antd';
import { HeaderContainer } from './components/containers';
import "./globals.css";

export const metadata: Metadata = {
  title: "Omniscient",
  description: "Production Orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <AntdApp>
            <HeaderContainer />
            {children}
          </AntdApp>
        </ConfigProvider>
      </body>
    </html>
  );
}

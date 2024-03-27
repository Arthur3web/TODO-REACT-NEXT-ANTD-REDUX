import { Inter } from 'next/font/google';

// import './globals.css';
import 'bootstrap/dist/css/bootstrap.css'; // add bootstrap css
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
import ReduxProvider from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <ReduxProvider>
          <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>
              {children}
            </ConfigProvider>
          </StyledComponentsRegistry>
        </ReduxProvider>
  );
}

import './globals.css';

import { GlobalUIProvider } from '@/modules/global/provider/GlobalUIProvider';
import { AppLayout } from '@/modules/layout/components/AppLayout';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactNode } from 'react';

export const metadata = {
  title: 'DDP Platform',
  description: '데이터 디스커버리 플랫폼',
};

/**
 * 루트 레이아웃
 * - 모든 페이지에 공통 적용
 * - 글로벌 스타일, 폰트, PrimeReact Provider 포함
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900">
        <AppRouterCacheProvider>
          <GlobalUIProvider>
            <AppLayout>{children}</AppLayout>
          </GlobalUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

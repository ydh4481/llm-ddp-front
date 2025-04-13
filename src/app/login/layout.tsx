import { ReactNode } from 'react';

/**
 * 로그인 페이지 전용 레이아웃
 * - 헤더/사이드바 없이 중앙 정렬된 배경
 */
export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">{children}</div>
  );
}

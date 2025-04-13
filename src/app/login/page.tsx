// src/app/login/page.tsx
'use client';

import { LoginCard } from '@/modules/auth/components/LoginCard';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <LoginCard />
    </div>
  );
}

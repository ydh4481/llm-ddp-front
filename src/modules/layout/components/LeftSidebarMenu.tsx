'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarMenuItems } from './LeftSidebarMenuItems';

export const LeftSidebarMenu = () => {
  const pathname = usePathname();

  return (
    <div className="border-b flex flex-col">
      {sidebarMenuItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            className={`flex items-center px-3 py-3 gap-3 rounded-md transition-all
              hover:bg-blue-50 hover:text-blue-600
              ${isActive ? 'font-semibold' : 'text-gray-800'}
            `}
            href={item.href}
            key={item.href}
          >
            <i className={item.icon} />
            <span className="text-sm overflow-hidden">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

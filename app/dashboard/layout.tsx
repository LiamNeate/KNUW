import TopNav from '@/app/ui/dashboard/topnav';
import type { User } from '@/app/lib/definitions';
import { getUser } from '../lib/data';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex-row md:overflow-hidden">
      <div className="w-screen flex-grow pt-5 h-20 content-center">
        <Suspense>
          <TopNav />
        </Suspense>
      </div>
      <div>

      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
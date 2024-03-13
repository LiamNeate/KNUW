import TopNav from '@/app/ui/dashboard/topnav';
import type { User } from '@/app/lib/definitions';
import { getUser } from '../lib/data';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <div className="h-screen flex-row md:overflow-hidden">
      <div className="w-screen flex-grow pt-5 h-20 content-center">
        <TopNav />
      </div>
      <div>
        {!!session &&
        <span>
          Logout
        </span>
        }
        {!session &&
        <Link href="/login">
          Login
        </Link>
        }
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import KnuwLogo from '@/app/ui/knuw-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';
import Search from '@/app/ui/search';

export default function TopNav() {
  return (
    <div className="shadow-md pb-5 w-screen h-full flex flex-row grow">
      <div className='flex w-1/5 h-full justify-center items-center' >
        <p className={`${inter.className} text-3xl font-bold`}>KNUW</p>
      </div>
      <div className='w-3/5 h-full'>
        <Search placeholder="" />
      </div>
      <div className='flex w-1/5 h-full justify-center items-center' >
        <p>User</p>
      </div>
    </div>
  );
}

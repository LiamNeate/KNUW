import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import KnuwLogo from '@/app/ui/knuw-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { auth } from '../../../auth';
import { fetchUserId } from '@/app/lib/data';
import { Image} from "@nextui-org/react";

export default async function TopNav() {

  const user = await auth()

  const email = user?.user?.email!;
  const userId = await fetchUserId(email);

  const topicImage = '/default.png'

  return (
    <div className="shadow-md pb-5 w-screen h-full flex flex-row grow">
      <div className='flex w-1/5 h-full justify-center items-center' >
        <Link href="/dashboard">
          <p className={`${inter.className} text-3xl font-bold`}>KNUW</p>
        </Link>
      </div>
      <div className='w-3/5 h-full'>
        <Search placeholder="" />
      </div>
      <div className='flex w-1/5 h-full justify-center items-center flex-wrap' >
        <Link href={{
            pathname: '/dashboard/users',
            query: { id: userId[0].id}
          }}
          passHref={true}
          className='flex items-center	'
        >
          <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={topicImage}
                    width={30}
                    height={30}
                    />
          <p className='ml-2'>{userId[0].pre_name}</p>
        </Link>
      </div>
    </div>
  );
}

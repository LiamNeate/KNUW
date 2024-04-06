"use client"

import { lusitana } from '@/app/ui/fonts';
import { fetchTopic} from '@/app/lib/data';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'

export default async function Page() {

  const searchParams = useSearchParams();
  const query = searchParams.get('id') || '';
  const topicInfo = await fetchTopic(query);

  return (
    <main>
      {topicInfo?.map((topic) =>
      <div>
        <h1>
          {topic.topic}
        </h1>
          <div>
          <Link href={{
                pathname: '/dashboard/image',
                query: { id: topic.id}
              }}
              >
                <img src={topic.image} alt="Avatar"/>
              </Link>
            <h4><b>{topic.topic}</b></h4>
            <p>{topic.info}</p>
          </div>
            </div>
          )}
    </main>
  );
}
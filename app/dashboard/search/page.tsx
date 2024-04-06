import Pagination from '@/app/ui/search/pagination';
import Table from '@/app/ui/search/table';
import AccordionExample from '@/app/ui/search/collapse';
import { SearchSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Suspense } from 'react';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  return (
    <div className="w-full" style={{"width": "100%"}}> 
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Results</h1>
      </div>
      <Suspense  fallback={<SearchSkeleton />}>
        <AccordionExample query={query}/>
      </Suspense>
    </div>
  );
}
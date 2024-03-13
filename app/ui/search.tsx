'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... `+term);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term){
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="flex items-center justify-center h-9 rounded-l absolute left-0.5 top-1/2 w-[90px] -translate-y-1/2 text-black peer-focus:text-black bg-gray-200"> 
        <p >KNUW it!</p>
      </div>
      <input
        className="peer block w-full rounded-md border border-black py-[9px] pl-[100px] text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) =>{
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}

import KnuwLogo from '@/app/ui/knuw-logo';
import Form from './form';

export default function Page() {
  return (
    <main className="flex h-full flex-row bg-white">
      <div className="h-screen w-1/2 bg-gray-400 p-10 flex items-center justify-center">
        <div className="w-1/2 flex flex-col text-center h-1/4">
          <div className='inline-block basis-1/2 align-middle'>
            <strong className='text-7xl'>KNUW</strong>
          </div>
          <div className='inline-block basis-1/2 align-middle'>
            <h2 className="italic">An efficient way to exchange advice and recommendations in your business</h2>
          </div>
        </div>
      </div>
      <div className="flex-col w-1/2 h-screen">
        <div className="flex w-full justify-center items-end h-2/5">
          <div className="w-32 text-black md:w-36">
            <KnuwLogo />
          </div>
        </div>
        <Form />
      </div>
    </main>
  );
}

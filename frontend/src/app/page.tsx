'use client'
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18">
      <main id="content" className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto size-full">
        <div className="text-center px-1 sm:px-6 lg:px-8">
           <Image
                            priority
                            src={"/jarvis-logos/head-sub.svg"}
                            alt="main"
                            width={600}
                            height={600}
                        /> 

          <form>
            <div className="mt-8 space-y-4">
              <div className="grid">
               <button type="submit" className="sm:p-4 py-1 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-700 text-slate-300 hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none">
              <a href="/agent" aria-current="page">
                Launch App
              </a>
            </button>
              </div>
            </div>
          </form>
        </div>
      </main >
    </main >
  );
}

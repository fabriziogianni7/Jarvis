'use client'
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <main id="content" className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto size-full">
        <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="mt-1 sm:mt-3 text-4xl font-bold text-slate-300 sm:text-6xl">
            <div className="py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
              <span className="bg-clip-text bg-gradient-to-tr from-yellow-500 to-yellow-900 text-transparent">jarvis</span>
            </div>
          </h1>

          <h1 className="text-2xl text-black-600 sm:text-xl">
              Collaborative, Token-Gated, Pragmatic, Multi Agent
          </h1>
          <h1 className="text-small text-black-300 sm:text-small">
           {/* Collaborative, Token-Gated, Pragmatic, Multi Agent */}
          </h1>

          <form>
            <div className="mt-8 space-y-4">
              <div className="grid">
               <button type="submit" className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-700 text-slate-300 hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none">
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

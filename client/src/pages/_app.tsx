import { Sidebar } from '@/components/Sidebar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 flex justify-center overflow-auto p-16">
        <Component {...pageProps} />
      </main>

    </div>
  )
}

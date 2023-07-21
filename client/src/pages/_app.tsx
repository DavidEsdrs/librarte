import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen flex">
      <Component {...pageProps} />
    </div>
  )
}

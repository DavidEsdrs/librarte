import { AuthProvider, useAuth } from '@/hooks/useAuth'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen flex">
      <AuthProvider>
        <ToastContainer 
          theme="colored"
        />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  )
}

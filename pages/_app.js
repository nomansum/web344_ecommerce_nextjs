import '@/styles/globals.css'
import { CookiesProvider } from 'react-cookie';
import connectDB from '@/lib/db';
import { useEffect } from 'react';
export default function App({ Component, pageProps }) {
    connectDB()
  return(<CookiesProvider>
  <Component {...pageProps} />
  </CookiesProvider>)
}

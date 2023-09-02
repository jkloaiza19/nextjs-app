import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import { NotificationContextProvider } from '@/context/notification.context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJs events</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-with' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>  
  )
}

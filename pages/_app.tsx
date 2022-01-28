import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { ThemeProvider } from 'next-themes'
import { Layout } from '@components/common'
import { ScrollToTop } from '@components/ui/scroll'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {


  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ThemeProvider attribute="class">
        <ManagedUIContext>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
            <ScrollToTop/>
          </Layout>
        </ManagedUIContext>
      </ThemeProvider>
    </>
  )
}

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import AuthLayout from '@/layout/AuthLayout'
import UnauthLayout from '@/layout/UnauthLayout'
import { setupStore } from '@/store'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import '@/styles/globals.scss'
import 'nprogress/nprogress.css'
import 'normalize.css'

const store = setupStore()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  NProgress.configure({ showSpinner: false })

  useEffect(() => {
    router.events.on('routeChangeStart', () =>  NProgress.start())
    router.events.on('routeChangeError', () =>  NProgress.done())
    router.events.on('routeChangeComplete', () =>  NProgress.done())
  }, [])
  
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        { router.pathname.includes(PAGE_ROUTES.login.route) ? (
          <UnauthLayout>
            <Component {...pageProps} />
          </UnauthLayout>
        ) : (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) } 
      </Provider>
    </SessionProvider>
  )
}
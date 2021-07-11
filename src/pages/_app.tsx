import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/md-dark-indigo/theme.css'
import '../styles/main.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import { I18nProvider } from 'next-rosetta'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { DefaultSeo } from 'next-seo'

// import your default seo configuration
import SEO from '../seo.config'
import SocketProvider from '../utils/providers/socket.provider'
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <I18nProvider table={pageProps.table}>
                <SocketProvider>
                    <DefaultSeo {...SEO} />
                    <Component {...pageProps} />
                </SocketProvider>
            </I18nProvider>
        </Provider>
    )
}
export default MyApp

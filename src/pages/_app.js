import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import '../styles/nprogress.css'
import Nprogress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', () => Nprogress.start())
Router.events.on('routeChangeComplete', () => Nprogress.done())
Router.events.on('routeChangeError', () => Nprogress.done())

const App = ({ Component, pageProps }) => <Component {...pageProps} />

export default App

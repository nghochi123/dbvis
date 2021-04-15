import '../styles/globals.css'
import GlobalContextProvider from '../context/GlobalContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp

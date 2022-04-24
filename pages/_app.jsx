import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session} refetchInterval={10 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;

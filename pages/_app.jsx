import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

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

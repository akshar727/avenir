import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@/globals.css";
import "@/bookmark.css";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Avenir</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

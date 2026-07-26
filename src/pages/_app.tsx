import type { AppProps } from "next/app";
import Head from "next/head";
import { LazyMotion, domAnimation } from "framer-motion";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RakNova – AI Workforce Intelligence Platform</title>
        <meta name="description" content="RakNova revolutionizes recruitment with AI-powered candidate matching, resume analysis, and hiring intelligence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="RakNova – AI Workforce Intelligence" />
        <meta property="og:description" content="Next-generation AI-powered recruitment platform." />
        <meta property="og:type" content="website" />
      </Head>
      <LazyMotion features={domAnimation}>
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}

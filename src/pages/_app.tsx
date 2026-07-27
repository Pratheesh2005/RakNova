import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { getCurrentUser, checkRouteAccess } from "@/services/authService";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    const handleCheck = (url: string) => {
      const user = getCurrentUser();
      const access = checkRouteAccess(url, user);
      if (!access.allowed && access.redirectUrl) {
        setAuthorized(false);
        router.replace(access.redirectUrl);
      } else {
        setAuthorized(true);
      }
    };

    handleCheck(router.pathname);

    router.events.on("routeChangeStart", handleCheck);
    return () => {
      router.events.off("routeChangeStart", handleCheck);
    };
  }, [router]);

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
        {authorized ? <Component {...pageProps} /> : <div className="p-8 text-center text-xs text-slate-500 font-bold">Verifying authorization...</div>}
      </LazyMotion>
    </>
  );
}

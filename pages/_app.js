import { ThemeProvider } from "next-themes";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NProgress from "nprogress";
import Router from "next/router";
import "../styles/globals.css";
import Head from "next/head";
import { getCookieFromBrowser } from "../auth/cookies";
import { useEffect } from "react";
import api from "../utils/axios";

const Noop = ({ children }) => children;
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const token = getCookieFromBrowser("blog-jwt-token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const Layout = Component.Layout || Noop;
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

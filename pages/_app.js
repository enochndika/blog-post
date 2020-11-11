import { ThemeProvider } from "next-themes";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NProgress from "nprogress";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import Head from "next/head";
import { getCookieFromBrowser } from "../auth/cookies";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { I18nextProvider } from "react-i18next";
import api from "../utils/axios";
import "../i18n";
import { useTranslation } from "react-i18next";

const Noop = ({ children }) => children;
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <I18nextProvider i18n={i18n} initialLanguage={router.locale}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
}

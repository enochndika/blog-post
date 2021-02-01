import { ThemeProvider } from "next-themes";
import NProgress from "nprogress";
import "../styles/tailwind.css";
import "nprogress/nprogress.css";
import Head from "next/head";
import { getCookieFromBrowser } from "../auth/cookies";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { I18nextProvider } from "react-i18next";
import api from "../utils/axios";
import "../i18n";
import "../styles/style.css";
import { useTranslation } from "react-i18next";
import { AppProps } from "next/app";
import Props from "../utils/defaultProps";

const Noop = ({ children }: Props) => children;
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;
  const { locale } = router;
  const token = getCookieFromBrowser("blog-jwt-token");
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
}

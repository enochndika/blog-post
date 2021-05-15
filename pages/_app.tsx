import '@/styles/global.css';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { I18nextProvider } from 'react-i18next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { AppProps } from 'next/app';

import '../i18n';
import { getCookieFromBrowser } from '@/utils/cookies';
import api from '@/utils/axios';
import Props from '@/utils/defaultProps';

const Noop = ({ children }: Props) => children;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;
  const { locale } = router;
  const token = getCookieFromBrowser('blog-jwt-token');
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

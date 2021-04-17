import DefaultLayout from '../components/layout/default';
import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { getCookieFromBrowser } from '../auth/cookies';
import dynamic from 'next/dynamic';
import { AuthProps } from '../helpers/auth';

const Auth: ComponentType<AuthProps> = dynamic(
  () => import('../helpers/auth').then((mod) => mod.Auth),
  {
    ssr: true,
  },
);

export default function Signin() {
  const token = getCookieFromBrowser('blog-jwt-token');
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);

  return (
    <>
      <Head>
        <title>{t('Pages.signin.title')}</title>
        <meta name="description" content="Connectez-vous avec votre compte" />
      </Head>
      <div>
        <Auth login={true} />
      </div>
    </>
  );
}

Signin.Layout = DefaultLayout;

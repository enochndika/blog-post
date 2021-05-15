import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { ComponentType } from 'react';

import DefaultLayout from '@/components/layout/default';
import { AuthProps } from '@/helpers/auth';
import RedditSkeleton from '@/components/skeleton/reddit';

const Auth: ComponentType<AuthProps> = dynamic(() => import('@/helpers/auth'), {
  ssr: false,
  loading: () => <RedditSkeleton />,
});

export default function Register() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Pages.register.title')}</title>
        <meta
          name="description"
          content="Créer un compte pour accéder au blog de Enoch Ndika"
        />
      </Head>
      <Auth login={false} />
    </>
  );
}

Register.Layout = DefaultLayout;

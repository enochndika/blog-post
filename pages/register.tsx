import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import DefaultLayout from '@/layout/default';
import { AuthProps } from '@/modules/others/auth';
import RedditSkeleton from '@/components/skeleton/reddit';

const Auth: ComponentType<AuthProps> = dynamic(
  () => import('@/modules/others/auth'),
  {
    ssr: false,
    loading: () => <RedditSkeleton />,
  },
);

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

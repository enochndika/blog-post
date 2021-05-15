import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import dynamic from 'next/dynamic';
import UserLayout from '@/components/layout/user';
import DataTable from '@/components/skeleton/table';

const UserPosts = dynamic(() => import('@/helpers/userPosts'), {
  ssr: false,
  loading: () => <DataTable />,
});

export default function UserPostsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Pages.username.posts.index.title')}</title>
      </Head>
      <UserPosts />
    </>
  );
}

UserPostsPage.Layout = UserLayout;

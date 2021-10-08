import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import UserLayout from '@/layout/user';
import DataTable from '@/components/skeleton/table';

const UserPosts = dynamic(() => import('@/modules/others/userPosts'), {
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

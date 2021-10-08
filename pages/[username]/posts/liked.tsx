import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import UserLayout from '@/layout/user';
import RedditSkeleton from '@/components/skeleton/reddit';

const LikedPost = dynamic(() => import('@/modules/others/likedPost'), {
  ssr: false,
  loading: () => <RedditSkeleton />,
});

export default function LikedPostsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Pages.username.posts.liked.title')}</title>
      </Head>
      <div className="mb-16">
        <LikedPost />
      </div>
    </>
  );
}

LikedPostsPage.Layout = UserLayout;

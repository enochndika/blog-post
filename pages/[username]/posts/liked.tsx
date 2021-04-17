import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import UserLayout from '../../../components/layout/user';

const LikedPost = dynamic(
  () => import('../../../helpers/likedPost').then((mod) => mod.LikedPosts),
  { ssr: false },
);

export default function LikedPostsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Pages.username.posts.liked.title')}</title>
      </Head>
      <LikedPost />
    </>
  );
}

LikedPostsPage.Layout = UserLayout;

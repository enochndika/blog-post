import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import cogoToast from 'cogo-toast';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { getCookieFromBrowser } from '@/utils/cookies';
import UserLayout from '@/components/layout/user';
import RedditSkeleton from '@/components/skeleton/reddit';

const CreatePost = dynamic(() => import('@/helpers/createPost'), {
  ssr: false,
  loading: () => <RedditSkeleton />,
});

export default function CreatePostPage() {
  const token = getCookieFromBrowser('blog-jwt-token');
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) {
      cogoToast.info(t('Pages.post.create.redirectNotAUth'));
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>{t('Pages.post.create.title')}</title>
      </Head>
      {token && <CreatePost />}
    </>
  );
}

CreatePostPage.Layout = UserLayout;

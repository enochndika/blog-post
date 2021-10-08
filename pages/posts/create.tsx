import Head from 'next/head';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';

import UserLayout from '@/layout/user';
import { getCookieFromBrowser } from '@/config/cookies';
import RedditSkeleton from '@/components/skeleton/reddit';

const CreatePost = dynamic(() => import('@/modules/post/createPost'), {
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
  }, [token, t]);

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

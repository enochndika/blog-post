import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { getCookieFromBrowser } from '../../auth/cookies';
import cogoToast from 'cogo-toast';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Reddit from '../../components/skeleton/card';
import UserLayout from '../../components/layout/user';

const CreatePost = dynamic(
  () => import('../../helpers/createPost').then((mod) => mod.CreatePost),
  {
    ssr: false,
    loading: () => <Reddit />,
  },
);

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

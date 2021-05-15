import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import UserLayout from '@/components/layout/user';
import { fetches } from '@/actions/fetcher';
import { UpdatePostProps } from '@/helpers/updatePost';
import RedditSkeleton from '@/components/skeleton/reddit';
import { useFetchUserProfile } from '@/actions/userActions';

const UpdatePost: ComponentType<UpdatePostProps> = dynamic(
  () => import('@/helpers/updatePost'),
  { ssr: false, loading: () => <RedditSkeleton /> },
);

export default function UpdatePostPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router?.query;
  const { data: post } = useSWR(slug ? `/posts/read/${slug} ` : null, fetches);
  const { user } = useFetchUserProfile();

  return (
    <>
      <Head>
        <title>{t('Pages.username.posts.update.title')}</title>
      </Head>
      {user && user?.id === post?.userId && <UpdatePost post={post} />}
    </>
  );
}
UpdatePostPage.Layout = UserLayout;

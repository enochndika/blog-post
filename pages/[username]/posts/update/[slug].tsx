import useSWR from 'swr';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import UserLayout from '@/layout/user';
import { fetches } from '@/actions/fetcher';
import RedditSkeleton from '@/components/skeleton/reddit';
import { UpdatePostProps } from '@/modules/post/updatePost';
import { useFetchUserProfile } from '@/actions/userActions';

const UpdatePost: ComponentType<UpdatePostProps> = dynamic(
  () => import('@/modules/post/updatePost'),
  { ssr: false, loading: () => <RedditSkeleton /> },
);

export default function UpdatePostPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { slug } = router?.query;
  const { user } = useFetchUserProfile();
  const { data: post } = useSWR(slug ? `/posts/read/${slug} ` : null, fetches);

  if (!post) {
    return '...';
  }

  return (
    <>
      <Head>
        <title>{t('Pages.username.posts.update.title')}</title>
      </Head>
      {user && user?.id === post?.authorId && <UpdatePost post={post} />}
    </>
  );
}
UpdatePostPage.Layout = UserLayout;

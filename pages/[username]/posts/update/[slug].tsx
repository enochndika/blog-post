import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { loggedUser } from '../../../../auth/useUser';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import UserLayout from '../../../../components/layout/user';
import Reddit from '../../../../components/skeleton/card';
import useSWR from 'swr';
import { fetches } from '../../../../actions/fetcher';
import { ComponentType } from 'react';
import { UpdatePostProps } from '../../../../helpers/updatePost';

const UpdatePost: ComponentType<UpdatePostProps> = dynamic(
  () => import('../../../../helpers/updatePost').then((mod) => mod.UpdatePost),
  { ssr: false, loading: () => <Reddit /> },
);

export default function UpdatePostPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router?.query;
  const { data: post } = useSWR(slug ? `/posts/read/${slug} ` : null, fetches);
  const { user } = loggedUser();

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

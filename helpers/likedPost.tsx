import { loggedUser } from '../auth/useUser';
import { useFetchTotalPostLikedByUser } from '../actions/postActions';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/container';
import dynamic from 'next/dynamic';
import { PostsProps } from '../components/posts';
import { ComponentType } from 'react';

const Reddit = dynamic(() => import('../components/skeleton/card'), {
  ssr: false,
});

const DynamicPost: ComponentType<PostsProps> = dynamic(
  () => import('../components/posts').then((mod) => mod.Post),
  { ssr: false },
);

export const LikedPosts = () => {
  const { t } = useTranslation();
  const { user } = loggedUser();
  const { likes } = useFetchTotalPostLikedByUser(user?.id);

  if (!likes) {
    return <Reddit />;
  }

  return (
    <Container>
      {likes?.length <= 0 ? (
        <div className="text-3xl text-gray-700 font-medium my-20 dark:text-white text-center">
          {t('Pages.username.posts.liked.h1NotFound')}
        </div>
      ) : (
        <h1 className="text-3xl text-gray-700 font-medium my-20 dark:text-white text-center">
          {t('Pages.username.posts.liked.h1')}
        </h1>
      )}
      <DynamicPost
        post={likes}
        firstColClass="col-12 md:col-4"
        secondColClass="col-12 md:col-8"
        mainColClass="col-12 md:col-6 mb-12"
      />
    </Container>
  );
};

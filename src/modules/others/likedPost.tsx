import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import Row from '@/components/ui/row';
import Image from '@/components/others/image';
import Container from '@/components/ui/container';
import { PostsProps } from '@/components/others/posts';
import { useFetchUserProfile } from '@/actions/userActions';
import { useFetchTotalPostLikedByUser } from '@/actions/postActions';

const RedditSkeleton = dynamic(() => import('@/components/skeleton/reddit'), {
  ssr: false,
});

const Post: ComponentType<PostsProps> = dynamic(
  () => import('@/components/others/posts'),
  { ssr: false },
);

const LikedPosts = () => {
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();
  const { likes } = useFetchTotalPostLikedByUser(user?.id);

  if (!likes) {
    return <RedditSkeleton />;
  }

  return (
    <Container>
      {likes?.length <= 0 ? (
        <Row className="justify-center mt-20">
          <div className="col-12 md:col-6">
            <h3 className="my-4 text-center text-gray-700 dark:text-white text-2xl font-medium md:my-20 lg:text-3xl">
              {t('Pages.username.posts.liked.h1NotFound')}
            </h3>
            <Image src="/lottie.gif" height={1000} width={1000} alt="lottie" />
          </div>
        </Row>
      ) : (
        <h1 className="my-20 text-center text-gray-700 dark:text-white text-3xl font-medium">
          {t('Pages.username.posts.liked.h1')}
        </h1>
      )}
      <Post
        post={likes}
        firstColClass="col-12 md:col-6"
        secondColClass="col-12 md:col-6"
        mainColClass="col-12 md:col-6 mb-12"
      />
      <div className="md:pb-16" />
    </Container>
  );
};

export default LikedPosts;

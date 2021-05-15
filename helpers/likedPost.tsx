import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import { PostsProps } from '@/components/others/posts';
import { useFetchTotalPostLikedByUser } from '@/actions/postActions';
import Container from '@/components/ui/container';
import Image from '@/components/others/image';
import Row from '@/components/ui/row';
import { useFetchUserProfile } from '@/actions/userActions';

const RedditSkeleton = dynamic(() => import('@/components/skeleton/reddit'), {
  ssr: false,
});

const Post: ComponentType<PostsProps> = dynamic(
  () => import('@/components/others/posts'),
  { ssr: false },
);

export default function LikedPosts() {
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
            <h3 className="text-3xl text-gray-700 font-medium my-20 dark:text-white text-center">
              {t('Pages.username.posts.liked.h1NotFound')}
            </h3>
            <Image src="/lottie.gif" height={1000} width={1000} alt="lottie" />
          </div>
        </Row>
      ) : (
        <h1 className="text-3xl text-gray-700 font-medium my-20 dark:text-white text-center">
          {t('Pages.username.posts.liked.h1')}
        </h1>
      )}
      <Post
        post={likes}
        firstColClass="col-12 md:col-4"
        secondColClass="col-12 md:col-8"
        mainColClass="col-12 md:col-6 mb-12"
      />
      <div className="md:pb-16" />
    </Container>
  );
}

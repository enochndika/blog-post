import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import api from '@/config/axios';
import Row from '@/components/ui/row';
import DefaultLayout from '@/layout/default';
import { PostProps } from '@/utils/defaultProps';
import Container from '@/components/ui/container';
import Separator from '@/components/others/separator';
import { ImageProps } from '@/components/others/image';
import { PostsProps } from '@/components/others/posts';
import { SliderProps } from '@/components/others/slider';
import { PostDetailsProps } from '@/components/others/postDetails';

/* Using dynamic import to improve Time To First Byte (TTFB) */

const TrendPost: ComponentType<any> = dynamic(
  () => import('@/components/others/trendPosts'),
  { ssr: true },
);

const PopularTrendPosts: ComponentType<PostProps> = dynamic(
  () => import('@/components/others/popularTrendPosts'),
  { ssr: true },
);

const PostDetails: ComponentType<PostDetailsProps> = dynamic(
  () => import('@/components/others/postDetails'),
  { ssr: true },
);

const Post: ComponentType<PostsProps> = dynamic(
  () => import('@/components/others/posts'),
  { ssr: true },
);

const Image: ComponentType<ImageProps> = dynamic(
  () => import('@/components/others/image'),
  { ssr: false },
);

const Slider: ComponentType<SliderProps> = dynamic(
  () => import('@/components/others/slider'),
  { ssr: false },
);

export default function Home({
  data,
  recentPosts,
  popularPosts,
  trendPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const post = trendPosts[0];

  return (
    <>
      <Head>
        <title>Enoch Ndika Blog</title>
        <meta name="description" content="Side project made by Enoch Ndika" />
      </Head>
      <Container>
        <Row className="mt-12 lg:mt-20">
          <div className="col-12 2xl:col-5 lg:col-4">
            <Link href={`/posts/${post.slug}`}>
              <a>
                <Image
                  src={post.image[0]}
                  className="block w-full"
                  alt="post"
                  width={1500}
                  height={900}
                />
              </a>
            </Link>
            <div className="my-4 text-gray-800 dark:text-white text-2xl">
              {post.title}
            </div>
            <p className="mb-4 text-gray-600 dark:text-grayer text-small">
              {post.description.slice(0, 130)}
            </p>
            <PostDetails
              author={post.author?.fullName}
              category={post.category.name}
              date={post.createdAt}
              readTime={post.read_time}
            />
            <Separator />
          </div>
          <div className="col-12 2xl:col-4 md:col-7 lg:col-5 md:mt-28 lg:mt-0">
            <TrendPost post={trendPosts[1]} />
            <TrendPost post={trendPosts[2]} />
            <TrendPost post={trendPosts[3]} />
            <Separator />
          </div>
          <div className="col-12 2xl:col-3 md:col-5 lg:col-3 md:mt-28 lg:mt-0">
            <PopularTrendPosts number="01" post={trendPosts[4]} />
            <PopularTrendPosts number="02" post={trendPosts[5]} />
            <PopularTrendPosts number="03" post={trendPosts[6]} />
          </div>
        </Row>
        <Separator />
        <Slider data={data} />
        <Separator />
        <Row className="flex-col-reverse mt-12 md:flex-row md:mt-32">
          <div className="col-12 md:col-12 xl:col-9 -mt-8 overflow-hidden md:-mt-0">
            <h3 className="mb-10 text-3xl font-medium">
              {t('Components.recentPost.title')}
            </h3>
            <Post
              post={recentPosts}
              mainColClass="col-12"
              firstColClass="col-12 md:col-4 mb-10"
              secondColClass="col-12 md:col-8 mb-16 md:mb-20"
            >
              <div className="mb-5 ml-4 mt-5 text-lg font-medium md:mt-0">
                <Link href="/all-posts/1">
                  <a>{t('Components.recentPost.link')}</a>
                </Link>
              </div>
            </Post>
          </div>
          <div className="col-12 xl:col-3 mb-16 md:hidden md:mb-0 lg:block">
            <h3 className="mb-10 text-3xl font-medium">
              {t('Pages.index.popularPost')}
            </h3>
            <PopularTrendPosts number="01" post={popularPosts[0]} />
            <PopularTrendPosts number="02" post={popularPosts[1]} />
            <PopularTrendPosts number="03" post={popularPosts[2]} />
            <PopularTrendPosts number="04" post={popularPosts[3]} />
            <Separator />
          </div>
        </Row>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { data },
  } = await api.get('/posts/vip');
  const {
    data: { data: recentPosts },
  } = await api.get('/posts?limit=4');

  const {
    data: { data: popularPosts },
  } = await api.get('/posts?limit=4&sortBy=read_time');
  const {
    data: { data: trendPosts },
  } = await api.get('/posts/trends?limit=8');
  return {
    props: { data, recentPosts, popularPosts, trendPosts },
    revalidate: 5,
  };
};

Home.Layout = DefaultLayout;

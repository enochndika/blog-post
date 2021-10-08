import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import api from '@/config/axios';
import Row from '@/components/ui/row';
import Post from '@/components/others/posts';
import DefaultLayout from '@/layout/default';
import Container from '@/components/ui/container';
import { PaginationProps } from '@/components/others/pagination';

const Pagination: ComponentType<PaginationProps> = dynamic(
  () => import('@/components/others/pagination'),
  { ssr: false },
);

export default function AllPosts({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router
      .push({
        pathname: currentPath,
        query: currentQuery,
      })
      .then(() => window.scrollTo(0, 0));
  };
  return (
    <>
      <Head>
        <title>Liste de posts</title>
      </Head>
      <Container>
        <h1 className="my-20 text-center text-gray-700 dark:text-white text-3xl font-medium lg:text-4xl">
          Posts
        </h1>
        <Row className="justify-center">
          <div className="col-12 md:col-10">
            <Post
              mainColClass="col-12"
              firstColClass="col-12 md:col-3 mb-3"
              secondColClass="col-12 md:col-8 mb-16 md:mb-12"
              post={posts?.data}
            />
          </div>
        </Row>
        <Pagination
          onPageChange={paginationHandler}
          initialPage={posts?.currentPage - 1}
          pageCount={posts?.totalPages}
        />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await api.get('/posts?limit=500000');

  const paths =
    posts.data &&
    posts.data.map((post) => ({
      params: { page: JSON.stringify(post.id) },
    }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params;
  const { data } = await api.get(`/posts?page=${page}`);

  return {
    props: { posts: data },
    revalidate: 30,
  };
};

AllPosts.Layout = DefaultLayout;

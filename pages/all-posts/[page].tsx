import DefaultLayout from '../../components/layout/default';
import api from '../../utils/axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Container from '../../components/ui/container';
import { Post } from '../../components/posts';
import Row from '../../components/ui/row';
import { useTranslation } from 'react-i18next';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import PaginationProps from '../../components/pagination';

const Pagination: ComponentType<PaginationProps> = dynamic(
  () => import('../../components/pagination').then((mod) => mod.Pagination),
  { ssr: false },
);

export default function AllPosts({
  posts,
  currentPage,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
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
        <h1 className="text-4xl text-gray-700 dark:text-white text-center my-20 font-medium">
          Posts
        </h1>
        <Row className="justify-center">
          <div className="col-12 md:col-10">
            <Post
              mainColClass="col-12"
              firstColClass="col-12 md:col-3 mb-3 md:mb-12"
              secondColClass="col-12 md:col-8 mb-12 md:mb-0"
              post={posts}
            />
          </div>
        </Row>
        <Pagination
          onPageChange={paginationHandler}
          initialPage={currentPage - 1}
          pageCount={pages}
        />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { data: pages },
  } = await api.get('/static-pages');
  const paths =
    pages &&
    pages.map((post) => ({
      params: { page: post.page },
    }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params;
  const {
    data: { data: staticPages },
  } = await api.get('/static-pages');
  const { data } = await api.get(`/posts?page=${page}`);
  const currentPage = data.currentPage;
  const pageCount = data.totalPages;
  const posts = data.data;
  const pages = staticPages ? staticPages.length : null;

  return {
    props: { posts, pageCount, currentPage, pages },
    revalidate: 5,
  };
};

AllPosts.Layout = DefaultLayout;

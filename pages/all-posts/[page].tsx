import DefaultLayout from "../../components/layout/default";
import api from "../../utils/axios";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Head from "next/head";
import Container from "../../components/ui/container";
import { Post } from "../../components/posts";
import Row from "../../components/ui/row";
import { useTranslation } from "react-i18next";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

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
              firstColClass="col-12 md:col-3 mb-3 md:mb-12"
              secondColClass="col-12 md:col-8 mb-12 md:mb-0"
              post={posts}
            />
          </div>
        </Row>
        <ReactPaginate
          onPageChange={paginationHandler}
          initialPage={currentPage - 1}
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel={t("Pages.all-posts.previousLabel")}
          nextLabel={t("Pages.all-posts.nextLabel")}
          breakClassName={`${className.default} ${className.break}`}
          containerClassName={className.container}
          pageClassName={`${className.default} ${className.page}`}
          pageLinkClassName={"focus:outline-none"}
          previousClassName={`${className.default} ${className.previous}`}
          previousLinkClassName={"focus:outline-none"}
          nextClassName={`${className.default} ${className.next}`}
          nextLinkClassName={"focus:outline-none"}
          activeClassName={className.active}
        />
        <div className="font-bold pointer-events-none bg-blue-900" />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { data: pages },
  } = await api.get("/static-pages");
  const paths =
    pages &&
    pages.map((post) => ({
      params: { page: post.page },
    }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params;
  const {
    data: { data: staticPages },
  } = await api.get("/static-pages");
  const { data } = await api.get(`/posts?page=${page}`);
  const currentPage = data.currentPage;
  const pageCount = data.totalPages;
  const posts = data.data;
  const pages = staticPages ? staticPages.length : null;

  return {
    props: { posts, pageCount, currentPage, pages },
    revalidate: 30,
  };
};

export const className = {
  default: `relative block text-xs md:text-base py-2 px-1.5 md:px-2 dark:text-white text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800`,
  container: `flex flex-wrap pl-0 list-none rounded my-2 justify-start md:justify-center`,
  active: `font-bold bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900 hover:bg-gray-400`,
  break: `border-t border-b border-gray-300`,
  previous: `border-t border-b border-l border-gray-300 ml-0 rounded-l`,
  next: `border-t border-b border-r border-gray-300 rounded-r`,
  page: `border-t border-b border-gray-300 block`,
};

AllPosts.Layout = DefaultLayout;

import DefaultLayout from "../components/layout/default";
import api from "../utils/axios";
import { MDBContainer } from "mdbreact";
import style from "../styles/main/posts/index.module.css";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { UniversalPosts } from "../components/universelPost";
import Head from "next/head";

export default function AllPosts({ posts, pageCount, currentPage }) {
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
      <MDBContainer fluid className={style.container}>
        <h1
          className={`${style.title} h1-responsive text-center grey-text font-weight-bold`}
        >
          Posts
        </h1>
        <UniversalPosts center={true} md="10" lg="10" posts={posts} />
        <ReactPaginate
          onPageChange={paginationHandler}
          initialPage={currentPage - 1}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel="Precedent"
          nextLabel="Suivant"
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"activated"}
        />
      </MDBContainer>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const { data } = await api.get(`/posts?page=${page}`);
  const currentPage = data.currentPage;
  const pageCount = data.totalPages;
  const posts = data.data;

  return {
    props: { posts, pageCount, currentPage },
  };
};

AllPosts.Layout = DefaultLayout;

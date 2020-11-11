import DefaultLayout from "../../components/layout/default";
import api from "../../utils/axios";
import { MDBContainer } from "mdbreact";
import style from "../../styles/main/posts/index.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { UniversalPosts } from "../../components/universelPost";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function AllPosts() {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const router = useRouter();
  const title = router.query?.title;
  const page = router.query?.page || 1;

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

  useEffect(() => {
    if (title) {
      async function fetchQuery() {
        const { data } = await api.get(
          `/post-filters/search?title=${title}&page=${page}`
        );
        setData(data);
      }
      fetchQuery();
    }
  }, [title, page]);

  return (
    <>
      <Head>
        <title>{t("Pages.post.search.title")}</title>
      </Head>
      <MDBContainer fluid className={style.container}>
        <div
          className={`${style.title} h2-responsive text-center grey-text font-weight-bold`}
        >
          {data.data && data.data.length > 0
            ? t("Pages.post.search.h1") + " " + title
            : t("Pages.post.search.notFound")}
        </div>
        <UniversalPosts posts={data.data} md="10" lg="10" center={true} />
        {data.data && data.data.length > 0 && (
          <ReactPaginate
            onPageChange={paginationHandler}
            initialPage={data.currentPage - 1}
            pageCount={data.totalPages}
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
        )}
      </MDBContainer>
    </>
  );
}

AllPosts.Layout = DefaultLayout;

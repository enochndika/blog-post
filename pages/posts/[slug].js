import { useState } from "react";
import DefaultLayout from "../../components/layout/default";
import api from "../../utils/axios";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import {
  MDBCol,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBRow,
  MDBView,
} from "mdbreact";
import style from "../../styles/main/blogSlug.module.css";
import { HorizontalLine } from "../../components/horizontalLign";
import { checkLikeExist, formatDate, getTotalLikes } from "../../utils/formats";
import { PostComments } from "../../helpers/comments";
import useSWR from "swr";
import { RecentPosts } from "../../components/recentPost";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";
import { useRouter } from "next/router";
import { loggedUser } from "../../auth/useUser";
import { ReportModal } from "../../helpers/reportModal";

import {
  fetchPost,
  fetchPostLikes,
  likePost,
  unlikePost,
} from "../../actions/postActions";
import cogoToast from "cogo-toast";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const fetcher = (url) => api.get(url).then((res) => res.data.data);
export default function PostSlug({ post }) {
  const { t } = useTranslation();
  const [reportModal, setReportModal] = useState(false);
  const router = useRouter();
  const slug = router?.query?.slug;
  const { post: clientPost } = fetchPost(slug);
  const { likes, mutate: mutateLike } = fetchPostLikes(clientPost?.id);
  const { user } = loggedUser();
  const { data } = useSWR(
    clientPost ? `/post-filters/related/${clientPost?.id}?limit=8` : null,
    fetcher
  );

  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: stateToHTML(convertFromRaw(text)) };
    } catch (exp) {}
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };

  const onLikePost = async (postId) => {
    if (user) {
      await likePost(postId, user?.id);
      await mutateLike();
    }
    if (!user) {
      cogoToast.info(t("Pages.post.slug.likePostNotAuth"));
    }
  };

  const onDislikePost = async (postId) => {
    if (user) {
      await unlikePost(postId, user?.id);
      await mutateLike();
    }
    if (!user) {
      cogoToast.info(t("Pages.post.slug.dislikePostNotAuth"));
    }
  };

  const checkUserOnOpenModal = () => {
    if (user) {
      setReportModal(true);
    }
    if (!user) {
      cogoToast.info(t("Pages.post.slug.reportPostNotAuth"));
    }
  };
  const { theme } = useTheme();
  const isMounted = useMounted();

  if (router.isFallback) {
    return <div>{t("Pages.post.slug.fallback")}</div>;
  }

  return (
    <>
      {post && (
        <>
          <Head>
            <title>{post.title}</title>
            <meta name="description" content="Les details du post" />
          </Head>
          <MDBContainer fluid className={style.container}>
            <ReportModal
              userId={user?.id}
              id={clientPost?.id}
              toggle={toggleReportModal}
              isOpen={reportModal}
              post={true}
            />
            <HorizontalLine desktop />
            <MDBRow center>
              <MDBCol md="7" lg="7">
                <h1 className={`h2-responsive ${style.title}`}>{post.title}</h1>
                <MDBRow className="mb-4">
                  <div className="col-2 col-sm-1 col-md-1 col-lg-1">
                    <img
                      src="https://colorlib.com/preview/theme/meranda/images/person_1.jpg"
                      className={style.img}
                    />
                  </div>
                  <div className="col-10 col-sm-10 col-md-6 col-lg-6 m-0 p-0">
                    <div className={style.author}>
                      <div>
                        <span className="font-weight-bolder mr-1">
                          {post.user?.fullName}
                        </span>
                        <span className="grey-text mr-1">
                          {t("Components.default.category")}
                        </span>
                        <span>{post.posts_category?.name}</span>
                      </div>
                      <div className="grey-text">
                        <span className="mr-1">
                          <span className="mr-1">
                            {router?.locale === "fr"
                              ? formatDate(post.createdAt, "fr-FR")
                              : formatDate(post.createdAt, "en-US")}
                          </span>
                        </span>
                        <span>&#9632;</span>
                        <span className="ml-2">
                          {post.read_time}{" "}
                          {t("Components.default.estimatedRead")}
                          <MDBIcon icon="star" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="mt-3 mb-4">
                      <div className="float-left">
                        {checkLikeExist(likes && likes, user && user) ? (
                          <button
                            onClick={() => onDislikePost(clientPost?.id)}
                            className={
                              isMounted && theme === "light"
                                ? style.button
                                : style.buttonDark
                            }
                          >
                            <MDBIcon
                              far
                              icon="heart"
                              size="lg"
                              className="text-info mr-1"
                            />
                            {likes && likes.length > 0
                              ? getTotalLikes(likes)
                              : 0}{" "}
                            like(s)
                          </button>
                        ) : (
                          <button
                            onClick={() => onLikePost(clientPost?.id)}
                            className={
                              isMounted && theme === "light"
                                ? style.button
                                : style.buttonDark
                            }
                          >
                            <MDBIcon
                              far
                              icon="heart"
                              size="lg"
                              className="text-info mr-1"
                            />
                            {likes && likes.length > 0
                              ? getTotalLikes(likes)
                              : 0}
                            <span className="ml-1">like(s)</span>
                          </button>
                        )}
                      </div>
                      <div className="float-right">
                        <MDBDropdown dropleft>
                          <MDBDropdownToggle color="primary" tag="div">
                            <MDBIcon icon="ellipsis-v" />
                          </MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <MDBDropdownItem onClick={checkUserOnOpenModal}>
                              <MDBIcon icon="flag" className="mr-2" />
                              {t("Pages.post.slug.report")}
                            </MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </div>
                    </div>
                  </div>
                </MDBRow>
                {post.local && (
                  <MDBView>
                    <img
                      src={post.image}
                      className="d-block w-100"
                      alt="user"
                    />
                  </MDBView>
                )}

                {post.local && <div className={style.local}>{post.local}</div>}
                <div
                  className={style.content}
                  dangerouslySetInnerHTML={convertFromJSONToHTML(post.content)}
                />
                <PostComments post={post.id} />
              </MDBCol>
            </MDBRow>
            <RecentPosts
              posts={data}
              line
              md="6"
              lg="6"
              related={
                <div>
                  <div className="h5-responsive font-weight-bold mt-5">
                    {t("Pages.post.slug.morePost")}
                  </div>
                  <HorizontalLine desktop />
                </div>
              }
            />
          </MDBContainer>
        </>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const {
    data: { data: posts },
  } = await api.get(`/posts?limit=1000`);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const { data: post } = await api.get(`/posts/read/${slug}`);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

PostSlug.Layout = DefaultLayout;

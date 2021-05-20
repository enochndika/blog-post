import { ComponentType, Fragment, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { convertFromRaw } from 'draft-js';
import { useTranslation } from 'react-i18next';
import { stateToHTML } from 'draft-js-export-html';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import Dropdown from '@/components/ui/dropdown';
import Separator from '@/components/others/separator';
import DefaultLayout from '@/components/layout/default';
import api from '@/utils/axios';
import { checkLikeExist, getTotalLikes } from '@/utils/formats';
import Container from '@/components/ui/container';
import Row from '@/components/ui/row';
import { EllipsisVIcon, FlagIcon, HeartIcon } from '@/components/ui/icons';
import Image from '@/components/others/image';
import PostDetails from '@/components/others/postDetails';
import { button } from '@/components/ui/button';
import { PostsProps } from '@/components/others/posts';
import { ReportModalProps } from '@/helpers/reportModal';

import {
  likePost,
  unlikePost,
  useFetchPost,
  useFetchPostLikes,
  useFetchPostRelated,
} from '@/actions/postActions';
import { useFetchUserProfile } from '@/actions/userActions';

const PostComments: ComponentType<any> = dynamic(
  () => import('@/helpers/comments'),
  { ssr: false },
);

const Post: ComponentType<PostsProps> = dynamic(
  () => import('@/components/others/posts'),
  { ssr: false },
);

const ReportModal: ComponentType<ReportModalProps> = dynamic(
  () => import('@/helpers/reportModal'),
  { ssr: false },
);

export default function PostSlugPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { slug } = useRouter().query;
  const [reportModal, setReportModal] = useState(false);
  const { data: clientPost } = useFetchPost(post, slug);
  const { likes, mutate: mutateLike } = useFetchPostLikes(clientPost?.id);
  const { data } = useFetchPostRelated(clientPost);
  const { user } = useFetchUserProfile();

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
      cogoToast.info(t('Pages.post.slug.likePostNotAuth'));
    }
  };

  const onDislikePost = async (postId) => {
    if (user) {
      await unlikePost(postId, user?.id);
      await mutateLike();
    }
    if (!user) {
      cogoToast.info(t('Pages.post.slug.dislikePostNotAuth'));
    }
  };

  const checkUserOnOpenModal = () => {
    if (user) {
      setReportModal(true);
    }
    if (!user) {
      cogoToast.info(t('Pages.post.slug.reportPostNotAuth'));
    }
  };

  return (
    <Fragment>
      {post && (
        <Fragment>
          <Head>
            <title>{post.title}</title>
          </Head>
          <Container>
            <ReportModal
              userId={user?.id}
              id={clientPost?.id}
              toggle={toggleReportModal}
              isOpen={reportModal}
              post={true}
            />
            <Row className="justify-center mt-20">
              <div className="col-12 xl:col-7">
                <h1 className="text-2xl lg:text-3xl text-gray-700 font-medium mb-9 dark:text-white">
                  {clientPost.title}
                </h1>
                <Row className="mb-4">
                  <div className="col-2 md:col-1 -mr-4">
                    <img
                      src="https://colorlib.com/preview/theme/meranda/images/person_1.jpg"
                      className="w-full rounded-full object-contain"
                      alt={clientPost.title}
                    />
                  </div>
                  <div className="col-10 md:col-6 ">
                    <PostDetails
                      date={clientPost.createdAt}
                      readTime={clientPost.read_time}
                      author={clientPost.user?.fullName}
                      category={clientPost.posts_category?.name}
                    />
                  </div>
                  <div className="col-12">
                    <div className="mt-3 mb-4">
                      <div className="float-left ">
                        {checkLikeExist(likes && likes, user && user) ? (
                          <button
                            onClick={() => onDislikePost(clientPost?.id)}
                            className={button}
                            style={{ fontSize: 11 }}
                          >
                            <HeartIcon className="h-4 mr-1 mt-1.5 text-info" />
                            {likes && likes.length > 0
                              ? getTotalLikes(likes)
                              : 0}
                            <span className="pl-1">like(s)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onLikePost(clientPost?.id)}
                            className={button}
                            style={{ fontSize: 11 }}
                          >
                            <HeartIcon className="h-4 mr-1 mt-1.5 text-info" />
                            {likes && likes.length > 0
                              ? getTotalLikes(likes)
                              : 0}
                            <span className="pl-1">like(s)</span>
                          </button>
                        )}
                      </div>
                      <div className="float-right">
                        <Dropdown>
                          <Dropdown.Toggle className="flex">
                            <EllipsisVIcon className="h-5 mr-1 mt-5" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu left={true}>
                            <Dropdown.Item onClick={checkUserOnOpenModal}>
                              <span className="flex justify-center -px-8">
                                <FlagIcon className="h-4 mr-2" />
                                {t('Pages.post.slug.report')}
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </Row>
                {post.local && (
                  <Image
                    width={1500}
                    height={900}
                    src={clientPost.image[0]}
                    className="d-block w-full"
                    alt={clientPost.title}
                  />
                )}
                {post.local && (
                  <div className="mt-7 whitespace-pre-wrap">
                    {clientPost.local}
                  </div>
                )}
                <div
                  dangerouslySetInnerHTML={convertFromJSONToHTML(
                    clientPost.content,
                  )}
                />
                {data && <PostComments post={clientPost.id} />}
              </div>
            </Row>
            <Row>
              <div className="col-12">
                <div className="text-3xl font-bold mt-20 mb-8 dark:text-white text-gray-700">
                  {t('Pages.post.slug.morePost')}
                </div>
                <Separator desktop={true} />
                <Post
                  post={data}
                  firstColClass="col-12 md:col-4"
                  secondColClass="col-12 md:col-8"
                  mainColClass="col-12 md:col-6 mb-12"
                />
              </div>
            </Row>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { data: posts },
  } = await api.get(`/posts?limit=1000`);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const { data: post } = await api.get(`/posts/read/${slug}`);

  if (post && post.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

PostSlugPage.Layout = DefaultLayout;

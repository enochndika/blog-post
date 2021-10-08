import Head from 'next/head';
import dynamic from 'next/dynamic';
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { convertFromRaw } from 'draft-js';
import { useTranslation } from 'react-i18next';
import { stateToHTML } from 'draft-js-export-html';
import { ComponentType, Fragment, useState } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import {
  likePost,
  unlikePost,
  useFetchPost,
  useFetchPostLikes,
  useFetchPostRelated,
} from '@/actions/postActions';

import api from '@/config/axios';
import Row from '@/components/ui/row';
import DefaultLayout from '@/layout/default';
import Image from '@/components/others/image';
import { button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { checkLikeExist } from '@/utils/formats';
import Container from '@/components/ui/container';
import FlagIcon from '@/components/icons/others/flag';
import Separator from '@/components/others/separator';
import HeartIcon from '@/components/icons/human/heart';
import { PostsProps } from '@/components/others/posts';
import PostDetails from '@/components/others/postDetails';
import { useFetchUserProfile } from '@/actions/userActions';
import EllipsisVIcon from '@/components/icons/others/ellipsisV';
import ConfettiButton from '@/components/others/confettiButton';
import { ReportModalProps } from '@/modules/others/reportModal';

/* Using dynamic import to improve TTFB */

const PostComments: ComponentType<any> = dynamic(
  () => import('@/modules/comments/comments'),
  { ssr: false },
);

const Post: ComponentType<PostsProps> = dynamic(
  () => import('@/components/others/posts'),
  { ssr: false },
);

const ReportModal: ComponentType<ReportModalProps> = dynamic(
  () => import('@/modules/others/reportModal'),
  { ssr: false },
);

export default function PostSlugPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [reportModal, setReportModal] = useState(false);
  const [active, setActive] = useState(false);
  const { t } = useTranslation();
  const { slug } = useRouter().query;

  const { data: clientPost } = useFetchPost(post, slug);
  const {
    likes,
    mutate: mutateLike,
    totalLikes,
  } = useFetchPostLikes(clientPost?.id);
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
    if (!user) {
      return cogoToast.info(t('Pages.post.slug.likePostNotAuth'));
    }
    await likePost(postId, user?.id);
    await mutateLike();
    setActive(true);
  };

  const onDislikePost = async (postId) => {
    if (!user) {
      return cogoToast.info(t('Pages.post.slug.dislikePostNotAuth'));
    }
    await unlikePost(postId, user?.id);
    await mutateLike();
  };

  const checkUserOnOpenModal = () => {
    if (!user) {
      return cogoToast.info(t('Pages.post.slug.reportPostNotAuth'));
    }
    setReportModal(true);
  };

  return (
    <Fragment>
      {post && (
        <Fragment>
          <Head>
            <title>{post.title}</title>
          </Head>
          <Container>
            <ConfettiButton active={active} setActive={setActive} />
            <ReportModal
              userId={user?.id}
              id={clientPost?.id}
              toggle={toggleReportModal}
              isOpen={reportModal}
              post={true}
            />
            <Row className="justify-center mt-20">
              <div className="col-12 xl:col-7">
                <h1 className="mb-9 text-gray-700 dark:text-white text-2xl font-medium lg:text-3xl">
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
                  <div className="col-10 md:col-6">
                    <PostDetails
                      date={clientPost.createdAt}
                      readTime={clientPost.read_time}
                      author={clientPost.author?.fullName}
                      category={clientPost.category?.name}
                    />
                  </div>
                  <div className="col-12">
                    <div className="mb-4 mt-3">
                      <div className="float-left">
                        {checkLikeExist(likes && likes, user && user) ? (
                          <button
                            onClick={() => onDislikePost(clientPost?.id)}
                            className={button}
                            style={{ fontSize: 11 }}
                          >
                            <HeartIcon className="mr-1 mt-1.5 h-4 text-info" />
                            {totalLikes}
                            <span className="pl-1">like(s)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onLikePost(clientPost?.id)}
                            className={button}
                            style={{ fontSize: 11 }}
                          >
                            <HeartIcon className="mr-1 mt-1.5 h-4 text-info" />
                            {totalLikes}
                            <span className="pl-1">like(s)</span>
                          </button>
                        )}
                      </div>
                      <div className="float-right">
                        <Dropdown>
                          <Dropdown.Toggle className="flex">
                            <EllipsisVIcon className="mr-1 mt-5 h-5" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu left={true}>
                            <Dropdown.Item onClick={checkUserOnOpenModal}>
                              <span className="-px-8 flex justify-center">
                                <FlagIcon className="mr-2 h-4" />
                                {t('Pages.post.slug.report')}
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </Row>
                {post.fakeContent && (
                  <Image
                    width={1500}
                    height={900}
                    src={clientPost.image[0]}
                    className="d-block w-full"
                    alt={clientPost.title}
                  />
                )}
                {post.fakeContent && (
                  <div className="mt-7 whitespace-pre-wrap">
                    {clientPost.fakeContent}
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
                <div className="mb-8 mt-20 text-gray-700 dark:text-white text-3xl font-bold">
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

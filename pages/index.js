import styles from "../styles/main/Home.module.css";
import DefaultLayout from "../components/layout/default";
import { MDBCol, MDBContainer, MDBIcon, MDBRow, MDBView } from "mdbreact";
import { Carousel } from "../components/carousel";
import api from "../utils/axios";
import { RecentPosts } from "../components/recentPost";
import { PopularTrendPosts } from "../components/PopularTrendPosts";
import { TrendPost } from "../components/trendPost";
import { formatDate } from "../utils/formats";
import { HorizontalLine } from "../components/horizontalLign";
import Link from "next/link";
import Head from "next/head";

export default function Home({ data, recentPosts, popularPosts, trendPosts }) {
  const post = trendPosts[0];

  return (
    <>
      <Head>
        <title>Enoch Ndika Blog</title>
      </Head>
      <MDBContainer fluid className={styles.container}>
        <MDBRow className={styles.row}>
          <MDBCol md="4" lg="4">
            <Link href={`/posts/${post.slug}`}>
              <a>
                <MDBView zoom waves hover>
                  <img src={post.image} className="d-block w-100" alt="post" />
                </MDBView>
              </a>
            </Link>
            <div className="h3-responsive font-weight-bolder mt-3 mb-3">
              {post.title}
            </div>
            <p className={styles.description}>
              {post.description.slice(0, 130)}
            </p>
            <div className={styles.author}>
              <div>
                <span className="font-weight-bolder mr-1">
                  {post.user?.fullName}
                </span>
                <span className="grey-text mr-1">in</span>
                <span>{post.posts_category.name}</span>
              </div>
              <div className="grey-text">
                <span className="mr-1">{formatDate(post.createdAt)}</span>
                <span>&#9632;</span>
                <span className="ml-2">
                  {post.read_time} min read <MDBIcon icon="star" />
                </span>
              </div>
            </div>
            <HorizontalLine />
          </MDBCol>
          <MDBCol md="5" lg="5">
            <TrendPost post={trendPosts[1]} />
            <TrendPost post={trendPosts[2]} />
            <TrendPost post={trendPosts[3]} />
            <HorizontalLine />
          </MDBCol>
          <MDBCol md="3" lg="3">
            <PopularTrendPosts number="01" post={trendPosts[4]} />
            <PopularTrendPosts number="02" post={trendPosts[5]} />
            <PopularTrendPosts number="03" post={trendPosts[6]} />
          </MDBCol>
        </MDBRow>
        <HorizontalLine />
        <Carousel posts={data} />
        <HorizontalLine />
        <MDBRow className={`${styles.rowChildren} `}>
          <MDBCol md="9" lg="9">
            <RecentPosts posts={recentPosts} lg="12" md="12" text />
          </MDBCol>
          <MDBCol md="3" lg="3">
            <h5 className="h5-responsive font-weight-bold dark-grey-text mb-5">
              <u>Popular posts</u>
            </h5>
            <PopularTrendPosts number="01" post={popularPosts[0]} />
            <PopularTrendPosts number="02" post={popularPosts[1]} />
            <PopularTrendPosts number="03" post={popularPosts[2]} />
            <PopularTrendPosts number="04" post={popularPosts[3]} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export const getStaticProps = async () => {
  const { data } = await api.get("/post-filters/vip");
  const {
    data: { data: recentPosts },
  } = await api.get("/posts?limit=4");

  const {
    data: { data: popularPosts },
  } = await api.get("/posts?limit=4&sortBy=read_time");
  const {
    data: { data: trendPosts },
  } = await api.get("/post-filters/trend-posts?limit=8");
  return {
    props: { data, recentPosts, popularPosts, trendPosts },
    revalidate: 30,
  };
};

Home.Layout = DefaultLayout;

import { loggedUser } from "../../../auth/useUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { MDBContainer, MDBDataTableV5, MDBIcon } from "mdbreact";
import DefaultLayout from "../../../components/layout/default";
import style from "../../../styles/main/username/posts.module.css";
import { useTheme } from "next-themes";
import { useMounted } from "../../../utils/mounted";
import { formatFullDate } from "../../../utils/formats";
import { useEffect } from "react";
import { getCookieFromBrowser } from "../../../auth/cookies";
import {
  deletePost,
  fetchPostsByUser,
} from "../../../utils/actions/postActions";
import Head from "next/head";

const token = getCookieFromBrowser("blog-jwt-token");
export default function Posts() {
  const { user } = loggedUser();
  const { theme } = useTheme();
  const isMounted = useMounted();
  const router = useRouter();
  const { posts, mutate } = fetchPostsByUser(user?.id);

  const styles = {
    forcedInline: {
      display: "inline",
      width: "15px",
      height: "7px",
      padding: 3,
    },
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  });
  const datatable = {
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
      },
      {
        label: "Picture",
        field: "image",
        sort: "asc",
      },
      {
        label: "Date",
        field: "createdAt",
        sort: "asc",
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
      },
    ],
    rows:
      posts &&
      posts.map((post) => {
        return {
          title: post.title.slice(0, 40) + "...",
          description: post.description.slice(0, 30) + "...",
          category: post.posts_category.name,
          image: (
            <img src={post.image} alt={post.title} height={60} width={80} />
          ),
          createdAt: formatFullDate(post.createdAt),
          actions: (
            <div>
              <div className="text-center" style={styles.forcedInline}>
                <Link href={`/${user.username}/posts/update/${post.slug}`}>
                  <a>
                    <MDBIcon icon="edit" />
                  </a>
                </Link>
              </div>
              <div className="text-center" style={styles.forcedInline}>
                <Link href={`/posts/${post.slug}`}>
                  <span>
                    <MDBIcon far icon="eye" />
                  </span>
                </Link>
              </div>
              <div className="text-center" style={styles.forcedInline}>
                <MDBIcon
                  far
                  icon="trash-alt"
                  className="text-danger"
                  onClick={async () => {
                    if (window.confirm(`Are you sure ?`)) {
                      await deletePost(post.id, user?.id);
                      await mutate();
                    }
                  }}
                />
              </div>
            </div>
          ),
        };
      }),
  };

  if (!posts) {
    return null;
  }
  return (
    <>
      <Head>
        <title>My posts</title>
      </Head>
      <MDBContainer fluid className={style.container}>
        {user?.id === posts[0]?.userId ? (
          <MDBDataTableV5
            className="mt-5"
            data={datatable}
            entries={10}
            pagesAmount={4}
            pagingTop
            hover
            searchTop
            searchBottom={false}
            responsive
            responsiveMd
            responsiveSm
            noRecordsFoundLabel="You have 0 post, Why not adding one?"
            small
            tbodyTextWhite={isMounted && theme === "dark"}
            theadTextWhite={isMounted && theme === "dark"}
            entriesLabel="Posts by page"
            infoLabel={["Show", "to", "of", "posts"]}
          />
        ) : (
          <div className="text-center mt-5">
            <h3 className="grey-text ">You don't have posts</h3>
          </div>
        )}
      </MDBContainer>
    </>
  );
}

Posts.Layout = DefaultLayout;

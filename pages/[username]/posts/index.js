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
import { deletePost, fetchPostsByUser } from "../../../actions/postActions";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function Posts() {
  const { t } = useTranslation();
  const token = getCookieFromBrowser("blog-jwt-token");
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
  }, [token]);
  const datatable = {
    columns: [
      {
        label: t("Pages.username.posts.index.table.title"),
        field: "title",
        sort: "asc",
      },
      {
        label: t("Pages.username.posts.index.table.description"),
        field: "description",
        sort: "asc",
      },
      {
        label: t("Pages.username.posts.index.table.image"),
        field: "image",
        sort: "asc",
      },
      {
        label: t("Pages.username.posts.index.table.date"),
        field: "createdAt",
        sort: "asc",
      },
      {
        label: t("Pages.username.posts.index.table.actions"),
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
          createdAt:
            router?.locale === "fr"
              ? formatFullDate(post.createdAt, "fr-FR")
              : formatFullDate(post.createdAt, "en-US"),
          actions: (
            <div>
              <div className="text-center" style={styles.forcedInline}>
                <Link href={`/${user.username}/posts/update/${post.slug}`}>
                  <a>
                    <MDBIcon
                      icon="edit"
                      className={
                        isMounted && theme === "dark" ? "white-text" : null
                      }
                    />
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
                    if (
                      window.confirm(
                        t("Pages.username.posts.index.deleteConfirm")
                      )
                    ) {
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
        <title>{t("Pages.username.posts.index.title")}</title>
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
            noRecordsFoundLabel={t(
              "Pages.username.posts.index.tableDetail.noRecordsFoundLabel"
            )}
            small
            tbodyTextWhite={isMounted && theme === "dark"}
            theadTextWhite={isMounted && theme === "dark"}
            entriesLabel={t(
              "Pages.username.posts.index.tableDetail.entriesLabel"
            )}
            infoLabel={[
              t("Pages.username.posts.index.tableDetail.infoLabel.a"),
              t("Pages.username.posts.index.tableDetail.infoLabel.b"),
              t("Pages.username.posts.index.tableDetail.infoLabel.c"),
              t("Pages.username.posts.index.tableDetail.infoLabel.d"),
            ]}
          />
        ) : (
          <div className="text-center mt-5">
            <h3 className="grey-text ">
              {t("Pages.username.posts.index.postNotFound")}
            </h3>
          </div>
        )}
      </MDBContainer>
    </>
  );
}

Posts.Layout = DefaultLayout;

import { loggedUser } from "../../../auth/useUser";
import { useRouter } from "next/router";
import { formatFullDate, sliceText } from "../../../utils/formats";
import { ComponentType, useMemo } from "react";
import { deletePost, useFetchPostsByUser } from "../../../actions/postActions";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Container from "../../../components/ui/container";
import { Image } from "../../../components/image";
import { TableProperty } from "../../../components/tableProperty";
import dynamic from "next/dynamic";
import UserLayout from "../../../components/layout/user";
import { TableProps } from "../../../components/table";

const DataTable = dynamic(() => import("../../../components/skeleton/table"), {
  ssr: false,
});

const Table: ComponentType<TableProps> = dynamic(
  () => import("../../../components/table").then((mod) => mod.Table),
  { ssr: false }
);

export default function PostsPage() {
  const { t } = useTranslation();
  const { user } = loggedUser();
  const router = useRouter();
  const { locale } = router;
  const { posts, mutate } = useFetchPostsByUser(user?.id);

  const removePost = async (row, userId) => {
    if (window.confirm(t("Pages.username.posts.index.deleteConfirm"))) {
      await deletePost(row?.id, userId);
      await mutate();
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: t("Pages.username.posts.index.table.title"),
            accessor: "title",
          },
          {
            Header: t("Pages.username.posts.index.table.description"),
            accessor: (row) => sliceText(row.description, 55),
          },
          {
            Header: t("Pages.username.posts.index.table.image"),
            accessor: (row) => (
              <Image
                src={row.image}
                className="h-12 w-12 rounded-full"
                alt="Post"
              />
            ),
          },
          {
            Header: t("Pages.username.posts.index.table.date"),
            accessor: (row) => formatFullDate(row.createdAt, locale),
          },
          {
            Header: t("Pages.username.posts.index.table.actions"),
            accessor: (row) => (
              <TableProperty>
                <TableProperty.Edit
                  href={`/${user?.username}/posts/update/${row.slug}`}
                />
                <TableProperty.View href={`/posts/${row.slug}`} />
                <TableProperty.Delete
                  onClick={() => removePost(row, user?.id)}
                />
              </TableProperty>
            ),
          },
        ],
      },
    ],
    []
  );

  if (!posts) {
    return <DataTable />;
  }
  return (
    <>
      <Head>
        <title>{t("Pages.username.posts.index.title")}</title>
      </Head>
      <Container>
        {user?.id === posts[0]?.userId ? (
          <Table columns={columns} data={posts} />
        ) : (
          <div className="text-center mt-5">
            <h3 className="grey-text ">
              {t("Pages.username.posts.index.postNotFound")}
            </h3>
          </div>
        )}
      </Container>
    </>
  );
}

PostsPage.Layout = UserLayout;

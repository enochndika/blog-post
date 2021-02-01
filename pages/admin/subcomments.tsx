import AdminLayout from "../../components/layout/Admin";
import useSWR from "swr";
import { fetcher } from "../../actions/fetcher";
import DataTable from "../../components/skeleton/table";
import Container from "../../components/ui/container";
import { ComponentType, useMemo } from "react";
import { TableProperty } from "../../components/tableProperty";
import { formatNumericDate } from "../../utils/formats";
import { useRouter } from "next/router";
import { useDeleteChildCommentByAdmin } from "../../actions/childCommentActions";
import dynamic from "next/dynamic";
import { TableProps } from "../../components/table";

const Table: ComponentType<TableProps> = dynamic(
  () => import("../../components/table").then((mod) => mod.Table),
  { ssr: false }
);

export default function AdminChildCommentsPage() {
  const { locale } = useRouter();
  const { data: childComments, mutate } = useSWR(
    "/child-comments?limit=2000",
    fetcher
  );

  const columns = useMemo(
    () => [
      {
        Header: "Child Comments",
        columns: [
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "Content",
            accessor: "content",
          },
          {
            Header: "User",
            accessor: "userId",
          },
          {
            Header: "Comment",
            accessor: "commentId",
          },
          {
            Header: "Date",
            accessor: (row) => formatNumericDate(row.createdAt, locale),
          },
          {
            Header: "Actions",
            accessor: (row) => (
              <TableProperty>
                <TableProperty.Delete
                  onClick={async () => {
                    if (window.confirm("Are you sur?")) {
                      await useDeleteChildCommentByAdmin(row.id);
                      await mutate();
                    }
                  }}
                />
              </TableProperty>
            ),
          },
        ],
      },
    ],
    []
  );

  if (!childComments) {
    return <DataTable />;
  }
  return (
    <Container>
      <Table columns={columns} data={childComments} />
    </Container>
  );
}

AdminChildCommentsPage.Layout = AdminLayout;

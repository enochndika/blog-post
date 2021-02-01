import AdminLayout from "../../components/layout/Admin";
import useSWR from "swr";
import { fetcher } from "../../actions/fetcher";
import DataTable from "../../components/skeleton/table";
import Container from "../../components/ui/container";
import { ComponentType, useMemo } from "react";
import { TableProperty } from "../../components/tableProperty";
import { formatNumericDate } from "../../utils/formats";
import { useRouter } from "next/router";
import { deleteCommentByAdmin } from "../../actions/commentActions";
import dynamic from "next/dynamic";
import { TableProps } from "../../components/table";

const Table: ComponentType<TableProps> = dynamic(
  () => import("../../components/table").then((mod) => mod.Table),
  { ssr: false }
);

export default function AdminCommentsPage() {
  const { locale } = useRouter();
  const { data: comments, mutate } = useSWR("/comments?limit=2000", fetcher);

  const columns = useMemo(
    () => [
      {
        Header: "Comments",
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
            Header: "Post",
            accessor: "postId",
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
                      await deleteCommentByAdmin(row.id);
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

  if (!comments) {
    return <DataTable />;
  }
  return (
    <Container>
      <Table columns={columns} data={comments} />
    </Container>
  );
}

AdminCommentsPage.Layout = AdminLayout;

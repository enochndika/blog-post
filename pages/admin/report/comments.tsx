import AdminLayout from "../../../components/layout/Admin";
import { formatNumericDate } from "../../../utils/formats";
import useSWR from "swr";
import { fetcher } from "../../../actions/fetcher";
import DataTable from "../../../components/skeleton/table";
import { deleteReportComment } from "../../../actions/commentActions";
import Container from "../../../components/ui/container";
import { ComponentType, useMemo } from "react";
import { TableProperty } from "../../../components/tableProperty";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { TableProps } from "../../../components/table";

const Table: ComponentType<TableProps> = dynamic(
  () => import("../../../components/table").then((mod) => mod.Table),
  { ssr: false }
);

export default function AdminReportCommentsPage() {
  const { locale } = useRouter();
  const { data: comments, mutate } = useSWR(
    "/report-comments?limit=2000",
    fetcher
  );

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
            Header: "Subject",
            accessor: "subject",
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
                      await deleteReportComment(row.id, mutate);
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

AdminReportCommentsPage.Layout = AdminLayout;

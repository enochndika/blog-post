import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ComponentType, useMemo } from 'react';

import { fetcher } from '@/actions/fetcher';
import Container from '@/components/ui/container';
import DataTable from '@/components/skeleton/table';
import { formatNumericDate } from '@/utils/formats';
import { TableProps } from '@/components/others/table';
import DashboardLayout from '@/layout/dashboard/layout';
import { deletePostReport } from '@/actions/postActions';
import TableProperty from '@/components/others/tableProperty';

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
  { ssr: false },
);

export default function AdminReportPostsPage() {
  const { data: posts, mutate } = useSWR('/report-posts?limit=2000', fetcher);
  const { locale } = useRouter();

  const columns = useMemo(
    () => [
      {
        Header: 'Comments',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Subject',
            accessor: 'subject',
          },
          {
            Header: 'User',
            accessor: 'userId',
          },
          {
            Header: 'Post',
            accessor: 'postId',
          },
          {
            Header: 'Date',
            accessor: (row) => formatNumericDate(row.createdAt, locale),
          },
          {
            Header: 'Actions',
            accessor: (row) => (
              <TableProperty>
                <TableProperty.Delete
                  onClick={async () => {
                    if (window.confirm('Are you sur?')) {
                      await deletePostReport(row.id, mutate);
                    }
                  }}
                />
              </TableProperty>
            ),
          },
        ],
      },
    ],
    [locale, mutate],
  );

  if (!posts) {
    return <DataTable />;
  }
  return (
    <Container>
      <Table columns={columns} data={posts} />
    </Container>
  );
}

AdminReportPostsPage.Layout = DashboardLayout;

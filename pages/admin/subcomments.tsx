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
import TableProperty from '@/components/others/tableProperty';
import { deleteChildCommentByAdmin } from '@/actions/childCommentActions';

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
  { ssr: false },
);

export default function AdminChildCommentsPage() {
  const { locale } = useRouter();
  const { data: childComments, mutate } = useSWR(
    '/child-comments?limit=2000',
    fetcher,
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Child Comments',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Content',
            accessor: 'content',
          },
          {
            Header: 'User',
            accessor: 'userId',
          },
          {
            Header: 'Comment',
            accessor: 'commentId',
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
                      await deleteChildCommentByAdmin(row.id);
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
    [locale, mutate],
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

AdminChildCommentsPage.Layout = DashboardLayout;

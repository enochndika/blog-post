import { ComponentType, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import AdminLayout from '@/components/layout/Admin';
import { fetcher } from '@/actions/fetcher';
import DataTable from '@/components/skeleton/table';
import Container from '@/components/ui/container';
import TableProperty from '@/components/others/tableProperty';
import { deleteUserByAdmin } from '@/actions/userActions';
import { formatFullDate, formatNumericDate } from '@/utils/formats';
import { TableProps } from '@/components/others/table';

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
  { ssr: false },
);

export default function AdminUsersPage() {
  const { locale } = useRouter();
  const { data: users, mutate } = useSWR('/users?limit=2000', fetcher);
  const columns = useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Full Name',
            accessor: 'fullName',
          },
          {
            Header: 'Role',
            accessor: 'role',
          },
          {
            Header: 'Last Logged Date',
            accessor: (row) => formatNumericDate(row.last_logged, locale),
          },
          {
            Header: 'Creation Date',
            accessor: (row) => formatFullDate(row.createdAt, locale),
          },
          {
            Header: 'Actions',
            accessor: (row) => (
              <TableProperty>
                <TableProperty.Delete
                  onClick={async () => {
                    if (window.confirm('Are you sur?')) {
                      await deleteUserByAdmin(row.id);
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
    [],
  );

  if (!users) {
    return <DataTable />;
  }
  return (
    <Container>
      <Table columns={columns} data={users} />
    </Container>
  );
}

AdminUsersPage.Layout = AdminLayout;

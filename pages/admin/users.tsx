import AdminLayout from '../../components/layout/Admin';
import useSWR from 'swr';
import { fetcher } from '../../actions/fetcher';
import DataTable from '../../components/skeleton/table';
import Container from '../../components/ui/container';
import { ComponentType, useMemo } from 'react';
import { TableProperty } from '../../components/tableProperty';
import { deleteUserByAdmin } from '../../actions/userActions';
import { formatFullDate, formatNumericDate } from '../../utils/formats';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { TableProps } from '../../components/table';

const Table: ComponentType<TableProps> = dynamic(
  () => import('../../components/table').then((mod) => mod.Table),
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

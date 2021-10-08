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

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
  { ssr: false },
);

export default function AdminLikePage() {
  const { locale } = useRouter();
  const { data: likes } = useSWR('/like-posts?limit=2000', fetcher);

  const columns = useMemo(
    () => [
      {
        Header: 'Likes',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'User',
            accessor: 'userId',
          },
          {
            Header: 'Date',
            accessor: (row) => formatNumericDate(row.createdAt, locale),
          },
        ],
      },
    ],
    [locale],
  );

  if (!likes) {
    return <DataTable />;
  }
  return (
    <Container>
      <Table columns={columns} data={likes} />
    </Container>
  );
}

AdminLikePage.Layout = DashboardLayout;

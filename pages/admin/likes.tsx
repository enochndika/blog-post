import AdminLayout from '../../components/layout/Admin';
import useSWR from 'swr';
import { fetcher } from '../../actions/fetcher';
import DataTable from '../../components/skeleton/table';
import Container from '../../components/ui/container';
import { ComponentType, useMemo } from 'react';
import { formatNumericDate } from '../../utils/formats';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { TableProps } from '../../components/table';

const Table: ComponentType<TableProps> = dynamic(
  () => import('../../components/table').then((mod) => mod.Table),
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
    [],
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

AdminLikePage.Layout = AdminLayout;

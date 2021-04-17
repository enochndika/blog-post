import AdminLayout from '../../components/layout/Admin';
import useSWR from 'swr';
import { fetcher } from '../../actions/fetcher';
import DataTable from '../../components/skeleton/table';
import Container from '../../components/ui/container';
import { ComponentType, useMemo } from 'react';
import { TableProperty } from '../../components/tableProperty';
import { formatNumericDate } from '../../utils/formats';
import { useRouter } from 'next/router';
import { Image } from '../../components/image';
import { deletePostByAdmin } from '../../actions/postActions';
import dynamic from 'next/dynamic';
import { TableProps } from '../../components/table';

const Table: ComponentType<TableProps> = dynamic(
  () => import('../../components/table').then((mod) => mod.Table),
  { ssr: false },
);

export default function AdminPostPage() {
  const { locale } = useRouter();
  const { data: posts, mutate } = useSWR('/posts?limit=2000', fetcher);

  const columns = useMemo(
    () => [
      {
        Header: 'Posts',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Image',
            accessor: (row) => (
              <Image
                src={row.image}
                className="h-12 w-12 rounded-full"
                alt="Post"
              />
            ),
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
                      await deletePostByAdmin(row.id);
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

  if (!posts) {
    return <DataTable />;
  }
  return (
    <Container>
      <Table columns={columns} data={posts} />
    </Container>
  );
}

AdminPostPage.Layout = AdminLayout;

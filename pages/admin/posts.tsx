import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ComponentType, useMemo } from 'react';

import { fetcher } from '@/actions/fetcher';
import Image from '@/components/others/image';
import Container from '@/components/ui/container';
import DataTable from '@/components/skeleton/table';
import { formatNumericDate } from '@/utils/formats';
import { TableProps } from '@/components/others/table';
import DashboardLayout from '@/layout/dashboard/layout';
import { deletePostByAdmin } from '@/actions/postActions';
import TableProperty from '@/components/others/tableProperty';

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
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
                src={row.image[0]}
                className="w-12 h-12 rounded-full"
                alt="Post"
                height={100}
                width={100}
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

AdminPostPage.Layout = DashboardLayout;

import { ComponentType, useMemo, useState } from 'react';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import AdminLayout from '@/components/layout/Admin';
import { fetcher } from '@/actions/fetcher';
import DataTable from '@/components/skeleton/table';
import Container from '@/components/ui/container';

import TableProperty from '@/components/others/tableProperty';
import { formatNumericDate } from '@/utils/formats';
import { deletePostCategory } from '@/actions/postActions';
import { PlusIcon } from '@/components/ui/icons';
import { AddCategoryProps } from '@/helpers/addCategory';
import { TableProps } from '@/components/others/table';

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
  { ssr: false },
);

const AddCategory: ComponentType<AddCategoryProps> = dynamic(
  () => import('../../helpers/addCategory'),
  { ssr: false },
);

export default function AdminPostCategoriesPage() {
  const { locale } = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const toggle = () => {
    setOpenModal(!openModal);
  };

  const { data: categories, mutate } = useSWR(
    '/post-categories?limit=2000',
    fetcher,
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Categories',
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'name',
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
                      await deletePostCategory(row.id, mutate);
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

  if (!categories) {
    return <DataTable />;
  }
  return (
    <Container>
      <AddCategory isOpen={openModal} toggle={toggle} mutate={mutate} />
      <Table columns={columns} data={categories}>
        <div
          onClick={() => setOpenModal(true)}
          className="mx-auto flex mt-1.5 cursor-pointer"
        >
          <PlusIcon size={20} className="mr-2" /> Add
        </div>
      </Table>
    </Container>
  );
}

AdminPostCategoriesPage.Layout = AdminLayout;

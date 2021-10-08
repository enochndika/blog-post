import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ComponentType, useMemo, useState } from 'react';

import { fetcher } from '@/actions/fetcher';
import Container from '@/components/ui/container';
import DataTable from '@/components/skeleton/table';
import { formatNumericDate } from '@/utils/formats';
import PlusIcon from '@/components/icons/others/plus';
import { TableProps } from '@/components/others/table';
import DashboardLayout from '@/layout/dashboard/layout';
import { deletePostCategory } from '@/actions/postActions';
import TableProperty from '@/components/others/tableProperty';
import { AddCategoryProps } from '@/modules/others/addCategory';

const Table: ComponentType<TableProps> = dynamic(
  () => import('@/components/others/table'),
  { ssr: false },
);

const AddCategory: ComponentType<AddCategoryProps> = dynamic(
  () => import('@/modules/others/addCategory'),
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
    [locale, mutate],
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
          className="flex mt-1.5 mx-auto cursor-pointer"
        >
          <PlusIcon size={20} className="mr-2" /> Add
        </div>
      </Table>
    </Container>
  );
}

AdminPostCategoriesPage.Layout = DashboardLayout;

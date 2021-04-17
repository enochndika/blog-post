import AdminLayout from '../../components/layout/Admin';
import DataTable from '../../components/skeleton/table';
import Container from '../../components/ui/container';
import { ComponentType, useMemo, useState } from 'react';
import { TableProperty } from '../../components/tableProperty';
import { formatNumericDate } from '../../utils/formats';
import { useRouter } from 'next/router';
import { deletePostCategory } from '../../actions/postActions';
import { PlusIcon } from '../../components/ui/icons';
import { useFetchStaticPages } from '../../actions/staticPageActions';
import dynamic from 'next/dynamic';
import { TableProps } from '../../components/table';
import { AddCategoryProps } from '../../helpers/addCategory';

const Table: ComponentType<TableProps> = dynamic(
  () => import('../../components/table').then((mod) => mod.Table),
  { ssr: false },
);

const AddCategory: ComponentType<AddCategoryProps> = dynamic(
  () => import('../../helpers/addCategory').then((mod) => mod.AddCategory),
  { ssr: false },
);

export default function AdminStaticPage() {
  const { locale } = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const toggle = () => {
    setOpenModal(!openModal);
  };

  const { pages, mutate } = useFetchStaticPages();

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
            Header: 'Page',
            accessor: 'page',
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

  if (!pages) {
    return <DataTable />;
  }
  return (
    <Container>
      <AddCategory isOpen={openModal} toggle={toggle} mutate={mutate} />
      <Table columns={columns} data={pages}>
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

AdminStaticPage.Layout = AdminLayout;

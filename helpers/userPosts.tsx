import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { formatFullDate, sliceText } from '@/utils/formats';
import { deletePost, useFetchPostsByUser } from '@/actions/postActions';
import Container from '@/components/ui/container';
import Image from '@/components/others/image';
import TableProperty from '@/components/others/tableProperty';
import Table from '@/components/others/table';
import Row from '@/components/ui/row';
import { useFetchUserProfile } from '@/actions/userActions';
import DataTable from '@/components/skeleton/table';

export default function UserPosts() {
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();
  const router = useRouter();
  const { locale } = router;
  const { posts, mutate } = useFetchPostsByUser(user?.id);

  const removePost = async (row, userId) => {
    if (window.confirm(t('Pages.username.posts.index.deleteConfirm'))) {
      await deletePost(row?.id, userId);
      await mutate();
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: t('Pages.username.posts.index.table.title'),
            accessor: 'title',
          },
          {
            Header: t('Pages.username.posts.index.table.description'),
            accessor: (row) => sliceText(row.description, 55),
          },
          {
            Header: t('Pages.username.posts.index.table.image'),
            accessor: (row) => (
              <Image
                width={50}
                height={50}
                src={row.image[0]}
                className="h-12 w-12 rounded-full"
                alt="Post"
              />
            ),
          },
          {
            Header: t('Pages.username.posts.index.table.date'),
            accessor: (row) => formatFullDate(row.createdAt, locale),
          },
          {
            Header: t('Pages.username.posts.index.table.actions'),
            accessor: (row) => (
              <TableProperty>
                <TableProperty.Edit
                  href={`/${user?.username}/posts/update/${row.slug}`}
                />
                <TableProperty.View href={`/posts/${row.slug}`} />
                <TableProperty.Delete
                  onClick={() => removePost(row, user?.id)}
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
      {user?.id === posts[0]?.userId ? (
        <Table columns={columns} data={posts} />
      ) : (
        <Row className="justify-center mt-20">
          <div className="col-12 md:col-6">
            <h3 className="text-3xl text-gray-700 font-medium my-20 dark:text-white text-center">
              {t('Pages.username.posts.index.postNotFound')}
            </h3>
            <Image src="/lottie.gif" height={1000} width={1000} alt="lottie" />
          </div>
        </Row>
      )}
    </Container>
  );
}

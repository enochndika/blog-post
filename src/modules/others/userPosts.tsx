import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Row from '@/components/ui/row';
import Image from '@/components/others/image';
import Table from '@/components/others/table';
import Container from '@/components/ui/container';
import DataTable from '@/components/skeleton/table';
import { formatFullDate, sliceText } from '@/utils/formats';
import { useFetchUserProfile } from '@/actions/userActions';
import TableProperty from '@/components/others/tableProperty';
import { deletePost, useFetchPostsByUser } from '@/actions/postActions';

const UserPosts = () => {
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();
  const router = useRouter();
  const { locale } = router;
  const { posts, mutate } = useFetchPostsByUser(user?.id);

  const removePost = useCallback(
    async (row, userId) => {
      if (window.confirm(t('Pages.username.posts.index.deleteConfirm'))) {
        await deletePost(row?.id, userId);
        await mutate();
      }
    },
    [mutate, t],
  );

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
                className="w-12 h-12 rounded-full"
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
    [locale, t, user?.id, user?.username, removePost],
  );

  if (!posts) {
    return <DataTable />;
  }
  return (
    <Container>
      {user?.id === posts[0]?.authorId ? (
        <Table columns={columns} data={posts} />
      ) : (
        <Row className="justify-center mt-20">
          <div className="col-12 md:col-6">
            <h3 className="my-4 text-center text-gray-700 dark:text-white text-2xl font-medium md:my-20 lg:text-3xl">
              {t('Pages.username.posts.index.postNotFound')}
            </h3>
            <Image src="/lottie.gif" height={1000} width={1000} alt="lottie" />
          </div>
        </Row>
      )}
    </Container>
  );
};

export default UserPosts;

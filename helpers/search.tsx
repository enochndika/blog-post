import { useRouter } from 'next/router';
import { ComponentType, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Reddit from '../components/skeleton/card';
import Row from '../components/ui/row';
import api from '../utils/axios';
import { Post } from '../components/posts';
import PaginationProps from '../components/pagination';
import dynamic from 'next/dynamic';

const Pagination: ComponentType<PaginationProps> = dynamic(
  () => import('../components/pagination').then((mod) => mod.Pagination),
  { ssr: false },
);

export const Search = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const title = router.query?.title;
  const page = router.query?.page || 1;

  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;
    router
      .push({
        pathname: currentPath,
        query: currentQuery,
      })
      .then(() => window.scrollTo(0, 0));
  };

  useEffect(() => {
    if (title) {
      const fetchQuery = async () => {
        const { data } = await api.get(
          `/post-filters/search?title=${title}&page=${page}`,
        );
        setData(data);
      };
      fetchQuery();
    }
  }, [title, page]);

  return (
    <>
      <h1 className="text-3xl text-gray-700 font-medium my-20 dark:text-white text-center">
        {!data.data && <Reddit />}
        {data.data && data.data.length > 0
          ? t('Pages.post.search.h1') + ' ' + title
          : t('Pages.post.search.notFound')}
      </h1>
      <Row className="justify-center">
        <div className="col-12 md:col-10">
          <Post
            mainColClass="col-12"
            firstColClass="col-12 md:col-3 mb-3 md:mb-12"
            secondColClass="col-12 md:col-8 mb-12 md:mb-0"
            post={data.data}
          />
        </div>
      </Row>
      {data.data && data.data.length > 0 && (
        <Pagination
          onPageChange={paginationHandler}
          initialPage={data.currentPage - 1}
          pageCount={data.totalPages}
        />
      )}
    </>
  );
};

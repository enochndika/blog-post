import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

export interface PaginationProps {
  pageCount: number | string;
  initialPage: number | string;
  onPageChange: (page: string) => void;
}

const style = {
  default: `relative block text-xs md:text-base py-2 px-1.5 md:px-2 dark:text-white text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800`,
  container: `flex flex-wrap pl-0 list-none rounded my-2 justify-start md:justify-center`,
  active: `font-bold bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900 hover:bg-gray-400`,
  break: `border-t border-b border-gray-300`,
  previous: `border-t border-b border-l border-gray-300 ml-0 rounded-l`,
  next: `border-t border-b border-r border-gray-300 rounded-r`,
  page: `border-t border-b border-gray-300 block`,
};

const Pagination = ({
  onPageChange,
  initialPage,
  pageCount,
}: PaginationProps) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-full">
      <ReactPaginate
        onPageChange={onPageChange}
        initialPage={initialPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={t('Pages.all-posts.previousLabel')}
        nextLabel={t('Pages.all-posts.nextLabel')}
        breakClassName={`${style.default} ${style.break}`}
        containerClassName={style.container}
        pageClassName={`${style.default} ${style.page}`}
        pageLinkClassName={'focus:outline-none'}
        previousClassName={`${style.default} ${style.previous}`}
        previousLinkClassName={'focus:outline-none'}
        nextClassName={`${style.default} ${style.next}`}
        nextLinkClassName={'focus:outline-none'}
        activeClassName={style.active}
      />
    </div>
  );
};

export default Pagination;

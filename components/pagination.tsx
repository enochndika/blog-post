import ReactPaginate from "react-paginate";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export default interface PaginationProps {
  onPageChange: (page: string) => void;
  initialPage: number | string;
  pageCount: number | string;
}

const className = {
  default: `relative block text-xs md:text-base py-2 px-1.5 md:px-2 dark:text-white text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800`,
  container: `flex flex-wrap pl-0 list-none rounded my-2 justify-start md:justify-center`,
  active: `font-bold bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900 hover:bg-gray-400`,
  break: `border-t border-b border-gray-300`,
  previous: `border-t border-b border-l border-gray-300 ml-0 rounded-l`,
  next: `border-t border-b border-r border-gray-300 rounded-r`,
  page: `border-t border-b border-gray-300 block`,
};

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  initialPage,
  pageCount,
}) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-full">
      <ReactPaginate
        onPageChange={onPageChange}
        initialPage={initialPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={t("Pages.all-posts.previousLabel")}
        nextLabel={t("Pages.all-posts.nextLabel")}
        breakClassName={`${className.default} ${className.break}`}
        containerClassName={className.container}
        pageClassName={`${className.default} ${className.page}`}
        pageLinkClassName={"focus:outline-none"}
        previousClassName={`${className.default} ${className.previous}`}
        previousLinkClassName={"focus:outline-none"}
        nextClassName={`${className.default} ${className.next}`}
        nextLinkClassName={"focus:outline-none"}
        activeClassName={className.active}
      />
    </div>
  );
};

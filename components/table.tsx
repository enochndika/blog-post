import React, { ReactNode } from 'react';
import {
  usePagination,
  useTable,
  useSortBy,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import {
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleLeftIcon,
  AngleRightIcon,
} from './ui/icons';
import * as matchSorter from 'match-sorter';

const sorter: any = matchSorter;
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search :
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="ml-1 text-base bg-white border-gray-300 dark:text-black border rounded-md  focus:outline-none py-1 px-2"
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list

function fuzzyTextFilterFn(rows, id, filterValue) {
  return sorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export interface TableProps {
  columns: Array<any>;
  children?: ReactNode;
  data: any;
}
export const Table = ({ columns, data, children }: TableProps) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <div className="mt-16">
      <div className="block md:flex justify-end mb-8">
        <div className="mb-6 md:mr-auto">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        {children}
        <div className="mb-6 md:mr-5">
          Go to page :
          <input
            type="number"
            className="ml-1 text-base bg-white border-gray-300 dark:text-black border rounded-md  focus:outline-none py-1 px-2"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </div>
        <div>
          <select
            className="text-base md:text-sm bg-white border-gray-300 dark:text-black border rounded-md focus:outline-none py-2 px-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="text-sm text-gray-800"
              >
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-full overflow-x-scroll md:overflow-x-hidden">
        <table {...getTableProps()} className="w-full border-collapse">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="pb-5"
                  >
                    {column.render('Header')}
                    {/* <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>*/}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  key={i}
                  {...row.getRowProps()}
                  className="md:hover:bg-gray-100 md:dark:hover:bg-gray-600"
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className="border-b border-gray-300 text-sm"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap mt-12 mb-6">
        <span>
          Page
          <strong className="pl-1">
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-2"
        >
          <AngleDoubleLeftIcon size={20} />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-2"
        >
          <AngleLeftIcon size={20} />
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-2"
        >
          <AngleRightIcon size={20} />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-2"
        >
          <AngleDoubleRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};

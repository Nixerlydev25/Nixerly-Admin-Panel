'use client';

import type React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import SkeletonTable from './skeleton/tableSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type DataTableProps<T> = {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    className?: string;
    render?: (item: T) => React.ReactNode;
    onClick?: (item: T) => void;
  }[];
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  renderRowActions?: (item: T) => React.ReactNode;
  isFetching?: boolean;
  LoaderComponent?: React.ReactNode;
};

export function DataTable<T>({
  data,
  columns,
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
  renderRowActions,
  isFetching = false,
  LoaderComponent = <SkeletonTable />,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];

    // Add Previous Button
    buttons.push(
      <Button
        className="px-2 py-1 text-xs transition-all duration-200 ease-in-out"
        key="previous"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>
    );

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            className="px-3 py-1 text-xs transition-all duration-200 ease-in-out"
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (currentPage > 2) {
        buttons.push(
          <Button
            className="px-3 py-1 text-xs transition-all duration-200 ease-in-out"
            key={1}
            variant="outline"
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
        );
        if (currentPage > 3) {
          buttons.push(
            <span key="start-ellipsis" className="px-1">
              ...
            </span>
          );
        }
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <Button
            className="px-3 py-1 text-xs transition-all duration-200 ease-in-out"
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          buttons.push(
            <span key="end-ellipsis" className="px-1">
              ...
            </span>
          );
        }
        buttons.push(
          <Button
            className="px-3 py-1 text-xs transition-all duration-200 ease-in-out"
            key={totalPages}
            variant="outline"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
    }

    // Add Next Button
    buttons.push(
      <Button
        className="px-2 py-1 text-xs transition-all duration-200 ease-in-out"
        key="next"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </Button>
    );

    return buttons;
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {isFetching && <div className="p-6 text-center">{LoaderComponent}</div>}
        {!isFetching && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {columns.map((col) => (
                    <TableHead
                      key={col.key as string}
                      className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 ${col.className}`}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                  {renderRowActions && (
                    <TableHead className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-200 transition-colors duration-150 ease-in-out hover:bg-gray-50"
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key as string}
                        className={`px-4 py-4 text-sm text-gray-800 ${col.className} ${col.onClick ? 'cursor-pointer' : ''}`}
                        onClick={() => col.onClick?.(item)}
                      >
                        {col.render ? col.render(item) : String(item[col.key])}
                      </TableCell>
                    ))}
                    {renderRowActions && (
                      <TableCell className="px-4 py-4 text-sm">
                        {renderRowActions(item)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <div className="mt-4 flex border-gray-200 px-2 sm:flex-row sm:items-center justify-between">
        <span className="mb-2 text-sm text-gray-600 sm:mb-0">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{' '}
          entries
        </span>
        <div className="flex items-center justify-center space-x-1 sm:justify-end">
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
}

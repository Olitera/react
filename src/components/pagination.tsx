'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setPage } from '../slices/pokemon-slice.ts';
import { store } from '../store/store.ts';

interface PaginationProps {
  page: number;
  next: string;
}

const Pagination: React.FC<PaginationProps> = ({ page = 1, next }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePageChange = (newPage: number) => {
    console.log(newPage, 'pagination');
    router.push(`/search/${newPage}`);
    dispatch(setPage(`${newPage}`));
    store.dispatch(setPage(`${newPage}`));
  };

  return (
    <div className="pagination">
      <button
        onClick={e => {
          e.stopPropagation();
          handlePageChange(+page - 1);
        }}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={e => {
          e.stopPropagation();
          handlePageChange(+page + 1);
        }}
        disabled={!next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

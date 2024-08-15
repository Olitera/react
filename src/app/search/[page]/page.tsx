import React from 'react';

import MainComponent from '../../../components/main-component.tsx';
import ThProvider from './new.tsx';

interface SearchPageProps {
  searchParams: { page?: string; query?: string };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const query = searchParams.query || '';

  return (
    <ThProvider>
      <MainComponent searchValue={query} page={+page} />
    </ThProvider>
  );
}

export default SearchPage;

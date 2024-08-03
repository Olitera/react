import React from 'react';
import { useRouter } from 'next/router';
import MainComponent from '../../components/main-component.tsx';

const SearchPage = () => {
  const router = useRouter();
  const { search } = router.query;

  return <MainComponent searchValue={search as string} />;
};

export default SearchPage;

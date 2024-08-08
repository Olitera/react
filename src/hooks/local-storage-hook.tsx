import React, { useEffect } from 'react';

const useLocalStorageHook = (initialValue: string) => {
  const isClient = typeof window !== 'undefined';
  const [value, setValue] = React.useState(() => {
    const searchValue = isClient
      ? localStorage.getItem('search')
      : initialValue;
    return searchValue ? searchValue : initialValue;
  });

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('search', value);
    }
  }, [value, isClient]);

  return [value, setValue] as const;
};

export default useLocalStorageHook;

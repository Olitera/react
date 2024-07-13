import React, { useEffect } from 'react';

const useLocalStorageHook = (initialValue: string) => {
  const [value, setValue] = React.useState(() => {
    const searchValue = localStorage.getItem('search');
    return searchValue ? searchValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem('search', value);
  }, [value]);

  return [value, setValue] as const;
};

export default useLocalStorageHook;

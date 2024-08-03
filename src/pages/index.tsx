// export default function Page() {
//   return null;
// }
//
// Page.getLayout = function getLayout(page: React.ReactNode) {
//   return <>{page}</>;
// }

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/search/1');
  }, [router]);

  return <div>Hello</div>;
};

export default Home;

import React from 'react';
import ThProvider from '../../new.tsx';
import DetailsComponent from '../../../../../components/details-component.tsx';
import MainComponent from '../../../../../components/main-component.tsx';

interface DetailsPageProps {
  params: { id: string };
  searchParams: { page?: string };
}

async function DetailsPage({ searchParams }: DetailsPageProps) {
  // const id = params.id;
  const page = searchParams.page || '1';

  return (
    <ThProvider>
      <div className="pokemons-container">
        <MainComponent
          // searchValue={ inputValue as string }
          page={+page}
        />
        <div className="detailed-section">
          <DetailsComponent
          // id={id}
          // page={page}
          />
        </div>
      </div>
    </ThProvider>
  );
}

export default DetailsPage;

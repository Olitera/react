import React from 'react';

interface SelectedComponentProps {
  selectedCount: number;
}
const SelectedComponent: React.FC<SelectedComponentProps> = ({
  selectedCount,
}) => {
  return (
    <div className="selected-container">
      <h4>
        {' '}
        {selectedCount} {selectedCount === 1 ? 'pokemon is' : 'pokemons are'}{' '}
        selected
      </h4>
      <button>Unselect all</button>
      <button>Download</button>
    </div>
  );
};

export default SelectedComponent;

import React from 'react';
const SelectedComponent: React.FC = () => {
  return (
    <div className="selected-container">
      <h4> ... pokemons are selected</h4>
      <button>Unselect all</button>
      <button>Download</button>
    </div>
  );
};

export default SelectedComponent;

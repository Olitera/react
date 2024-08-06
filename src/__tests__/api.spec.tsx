import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import SelectedComponent from '../components/selected-component';

jest.mock('../contexts/theme-context', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('SelectedComponent', () => {
  it('renders with the correct theme class', () => {
    render(
      <SelectedComponent
        selectedCount={2}
        onUnselectAll={() => {}}
        onDownload={() => {}}
      />
    );

    expect(screen.getByText('2 pokemons are selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  it('calls onUnselectAll when "Unselect all" is clicked', () => {
    const onUnselectAll = jest.fn();
    render(
      <SelectedComponent
        selectedCount={2}
        onUnselectAll={onUnselectAll}
        onDownload={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));
    expect(onUnselectAll).toHaveBeenCalled();
  });

  it('calls onDownload when "Download" is clicked', () => {
    const onDownload = jest.fn();
    render(
      <SelectedComponent
        selectedCount={2}
        onUnselectAll={() => {}}
        onDownload={onDownload}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Download/i }));
    expect(onDownload).toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonByIdQuery } from '../services/pokemon-api';
import DetailsComponent from '../components/details-component.tsx';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock('../services/pokemon-api', () => ({
  useGetPokemonByIdQuery: vi.fn(),
}));

describe('DetailsComponent', () => {
  const mockNavigate = vi.fn();
  const mockUseGetPokemonByIdQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: '1', search: 'pikachu' });
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue(
      mockUseGetPokemonByIdQuery
    );
  });

  it('renders failure state when data is null', () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      isLoading: false,
      data: null,
      error: null,
    });

    render(
      <MemoryRouter>
        <DetailsComponent />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Failed to load Pokemon details.')
    ).toBeInTheDocument();
  });
});

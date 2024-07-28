import { render, screen } from '@testing-library/react';
import NotFoundComponent from '../components/not-found-component.tsx';
import React from 'react';

describe('NotFoundComponent', () => {
  it('renders the 404 page', () => {
    render(<NotFoundComponent />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});

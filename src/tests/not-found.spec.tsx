import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundComponent from '../components/not-found-component.tsx';

describe('NotFoundComponent', () => {
  it('renders the 404 page', () => {
    render(<NotFoundComponent />);
    const headingElement = screen.getByText(/404/i);
    expect(headingElement).toBeInTheDocument();
  });
});

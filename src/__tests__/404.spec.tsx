import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Custom404 from '../pages/404.tsx';

describe('Custom404 Component', () => {
  it('should render the 404 - Page Not Found message', () => {
    render(<Custom404 />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});

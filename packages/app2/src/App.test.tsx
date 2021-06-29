import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App2', () => {
  render(<App />);
  const linkElement = screen.getByText(/App2/i);
  expect(linkElement).toBeInTheDocument();
});

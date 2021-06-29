import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App container', () => {
  render(<App />);
  const linkElement = screen.getByText(/App container/i);
  expect(linkElement).toBeInTheDocument();
});

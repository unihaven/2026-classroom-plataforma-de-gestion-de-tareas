import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('renders the error page with correct message', () => {
    render(<ErrorPage />);
    
    // Check that the heading text is rendered
    expect(screen.getByRole('heading', { name: /oops!/i })).toBeInTheDocument();
    
    // Check that the error message is displayed
    expect(screen.getByText(/the requested path does not exist/i)).toBeInTheDocument();
  });
});

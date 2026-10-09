import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test/test-utils';
import Home from './Home';

// Mock Header component
vi.mock('../../components/header/Header', () => ({
  default: () => <div data-testid="mock-header">Header Component</div>,
}));

// Mock Outlet component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
  };
});

describe('Home', () => {
  it('renders header and outlet components', () => {
    renderWithProviders(<Home />);
    
    // Check that header component is rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Header Component')).toBeInTheDocument();
    
    // Check that outlet component is rendered
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });
});

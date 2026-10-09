import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen } from '../../test/test-utils';
import Login from './Login';

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children }) => <a href="#">{children}</a>
  };
});

vi.mock('../../redux/slices/user/user.async.thunks', () => ({
  logUser: vi.fn(() => ({ 
    type: 'user/setUser/pending'
  })),
  registerUser: vi.fn(() => ({
    type: 'user/registerUser/pending'
  }))
}));

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    renderWithProviders(<Login />);
      // Check that the login form elements are rendered
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});

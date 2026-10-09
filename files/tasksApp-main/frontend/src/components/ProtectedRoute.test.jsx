import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../test/test-utils';
import ProtectedRoute from './ProtectedRoute';
import { mockUser } from '../test/mocks';

// Mock the user slice
vi.mock('../redux/slices/user/user.slice', () => {
  const setUser = vi.fn((userData) => ({
    type: 'user/setUser',
    payload: userData
  }));
  
  const resetUser = vi.fn(() => ({
    type: 'user/resetUser'
  }));
  
  return {
    setUser,
    resetUser,
    initialState: {
      id: 0,
      name: "",
      email: "",
      token: "",
      loading: false,
    },
    default: (state = { token: null }, action) => {
      if (action.type === 'user/setUser') {
        return action.payload;
      }
      return state;
    }
  };
});

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Outlet: () => <div data-testid="outlet-content">Protected Content</div>,
  };
});

// Mock navigate function
const mockNavigate = vi.fn();

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('redirects to login when user is not authenticated', async () => {
    renderWithProviders(<ProtectedRoute />, {
      preloadedState: {
        user: { token: null }
      }
    });
    
    // Loading state should be shown initially
    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
    
    // Should redirect to login
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/logIn');
    });
  });

  it('renders outlet when user is authenticated', () => {
    // Test with authenticated user
    renderWithProviders(<ProtectedRoute />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Should render the outlet content
    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });
  it('loads user from localStorage if available', async () => {
    // Create a spy to monitor if setUser is called
    const { setUser } = await import('../redux/slices/user/user.slice');
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    renderWithProviders(<ProtectedRoute />, {
      preloadedState: {
        user: { token: null }
      }
    });
    
    // Verify setUser was called with localStorage data
    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(mockUser);
    });
  });
});

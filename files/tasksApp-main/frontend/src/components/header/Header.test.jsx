import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../../test/test-utils';
import Header from './Header';

// Mock navigation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => window.mockNavigate,
  };
});

// Mock the resetUser action
vi.mock('../../redux/slices/user/user.slice', () => {
  const resetUser = vi.fn(() => ({ type: 'user/resetUser' }));
  
  // Create a default export for the reducer that returns initial state
  const userReducer = vi.fn().mockImplementation((state = { user: {} }) => {
    if (state === undefined) {
      return { user: {} };
    }
    return state;
  });
  
  return {
    resetUser,
    default: userReducer
  };
});

describe('Header', () => {
  // Reset mocks between tests
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header component correctly', () => {
    renderWithProviders(<Header />);
    
    // Check that the app name is rendered
    expect(screen.getByText(/tasks app/i)).toBeInTheDocument();
    
    // Check that the logout button is present
    const logoutButton = screen.getByRole('button');
    expect(logoutButton).toBeInTheDocument();
  });  it('calls logout when the button is clicked', () => {
    // Reset mocks for this test
    window.mockNavigate = vi.fn();
    
    renderWithProviders(<Header />);
    
    // Spy on localStorage removeItem
    const localStorageSpy = vi.spyOn(window.localStorage, 'removeItem');
    
    // Click the logout button
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    
    // Verify localStorage.removeItem was called
    expect(localStorageSpy).toHaveBeenCalledWith('user');
  });
});

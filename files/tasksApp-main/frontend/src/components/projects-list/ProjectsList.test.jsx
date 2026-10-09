import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test/test-utils';
import ProjectsList from './ProjectsList';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children }) => <a href="#">{children}</a>
  };
});

// Mock the async thunk
vi.mock('../../redux/slices/projects/projects.async.thunks', () => ({
  fetchProjects: vi.fn(() => ({ 
    type: 'projects/fetchProjects/pending'
  }))
}));

describe('ProjectsList', () => {
  const mockUser = { id: 1, username: 'testuser', token: 'fake-token' };
  const mockProjects = {
    list: [
      { id: 1, name: 'Project 1', description: 'Test project 1' }
    ],
    loading: false,
    error: null
  };

  it('renders loading state correctly', () => {
    renderWithProviders(<ProjectsList />, {
      preloadedState: {
        user: mockUser,
        projects: {
          ...mockProjects,
          loading: true
        }
      }
    });
    
    // Verify that loading text is shown
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

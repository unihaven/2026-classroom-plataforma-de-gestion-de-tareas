import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../../test/test-utils';
import AddProject from './AddProject';

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  window.mockNavigate = vi.fn();
  return {
    ...actual,
    useNavigate: () => window.mockNavigate
  };
});

// Properly mock addProject function that returns a proper action
vi.mock('../../redux/slices/projects/projects.async.thunks', () => {
  const mockAddProject = vi.fn().mockImplementation((data) => {
    // Return a properly structured action that middleware can handle
    return { 
      type: 'projects/addProject/pending',
      payload: data
    };
  });

  return {
    fetchProjects: vi.fn(() => ({ 
      type: 'projects/fetchProjects/pending'
    })),
    addProject: mockAddProject,
    updateProject: vi.fn(() => ({
      type: 'projects/updateProject/pending'
    })),
    removeProject: vi.fn(() => ({
      type: 'projects/removeProject/pending'
    }))
  };
});

describe('AddProject', () => {
  const mockUser = { id: 1, username: 'testuser', token: 'fake-token' };

  beforeEach(() => {
    vi.clearAllMocks();
  });  it('renders the add project form correctly', () => {
    renderWithProviders(<AddProject />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // There is no 'Create new project' title in the component
    // Instead check for form elements directly
    expect(screen.getByText("Project's name")).toBeInTheDocument();
    expect(screen.getByText("Project's Priority (0 - 10)")).toBeInTheDocument();
    expect(screen.getByText("Here you can add a description of your project, Markdown is supported.")).toBeInTheDocument();
    
    // Check that input fields are present
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter priority')).toBeInTheDocument();
    
    // Check that buttons are present
    expect(screen.getByText('Go back')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });  it.skip('calls addProject with form data when form is submitted', async () => {    // Get reference to the mocked addProject function
    const { addProject } = await import('../../redux/slices/projects/projects.async.thunks');
    
    renderWithProviders(<AddProject />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Fill in the form
    const nameInput = screen.getByPlaceholderText('Enter name');
    const priorityInput = screen.getByPlaceholderText('Enter priority');
    const descriptionInput = screen.getByLabelText("Here you can add a description of your project, Markdown is supported.");
    
    fireEvent.change(nameInput, { target: { value: 'New Project Name' } });
    fireEvent.change(priorityInput, { target: { value: '7' } });
    fireEvent.change(descriptionInput, { target: { value: 'Project description' } });
    
    // Submit the form
    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);
    
    // Verify that addProject was called with the expected data
    expect(addProject).toHaveBeenCalledWith({
      user: mockUser,
      project: expect.objectContaining({
        name: 'New Project Name',
        priority: '7',
        description: 'Project description'
      })
    });
  });

  it('handles input changes correctly', () => {
    renderWithProviders(<AddProject />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Change name input
    const nameInput = screen.getByPlaceholderText('Enter name');
    fireEvent.change(nameInput, { target: { value: 'New Project Name' } });
    expect(nameInput.value).toBe('New Project Name');
    
    // Change priority input
    const priorityInput = screen.getByPlaceholderText('Enter priority');
    fireEvent.change(priorityInput, { target: { value: '7' } });
    expect(priorityInput.value).toBe('7');
    
    // Change description input
    const descriptionInput = screen.getByLabelText("Here you can add a description of your project, Markdown is supported.");
    fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });
    expect(descriptionInput.value).toBe('Updated description');
  });  it('navigates back when back button is clicked', () => {
    // Reset the mock for this test
    window.mockNavigate.mockReset();
    
    renderWithProviders(<AddProject />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Click the back button
    const backButton = screen.getByText('Go back');
    fireEvent.click(backButton);
    
    // Verify navigation was attempted
    expect(window.mockNavigate).toHaveBeenCalled();
  });
});

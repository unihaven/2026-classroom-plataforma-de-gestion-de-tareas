import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../test/test-utils';

// Mock react-modal before importing the component
vi.mock('react-modal', () => {
  return {
    __esModule: true,
    default: Object.assign(
      ({ children, isOpen, contentLabel }) => (
        isOpen ? <div data-testid="modal" aria-label={contentLabel}>{children}</div> : null
      ),
      { setAppElement: vi.fn() }
    ),
  };
});

// Now import the component that uses Modal
import SingleProject from './SingleProject';

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  window.mockNavigate = vi.fn();
  return {
    ...actual,
    useNavigate: () => window.mockNavigate,
    useParams: () => ({}),
    useLocation: () => ({ pathname: "/" }),
  };
});

// Mock needed for react-markdown
vi.mock('remark-gfm', () => ({
  default: vi.fn(),
}));

// Mock fetchTasks to return a proper action
vi.mock('../../redux/slices/tasks/tasks.async.thunks', () => ({
  fetchTasks: vi.fn(() => ({ 
    type: 'tasks/fetchTasks/pending'
  })),
  addTask: vi.fn(() => ({ 
    type: 'tasks/addTask/pending'
  })),
  removeTask: vi.fn(() => ({ 
    type: 'tasks/removeTask/pending'
  })),
  updateTask: vi.fn(() => ({ 
    type: 'tasks/updateTask/pending'
  }))
}));

// Access the mocked functions for assertions
import { fetchTasks, addTask } from '../../redux/slices/tasks/tasks.async.thunks';

vi.mock('../../redux/slices/selected-project/selectedProject.slice', () => {
  const resetSelectedProject = vi.fn(() => ({ 
    type: 'selectedProject/resetSelectedProject'
  }));
  
  // Create a default export for the reducer
  const selectedProjectReducer = vi.fn().mockImplementation((state = {}, action) => state);
  
  return {
    resetSelectedProject,
    default: selectedProjectReducer
  };
});

// Access the mocked function for assertions
import { resetSelectedProject } from '../../redux/slices/selected-project/selectedProject.slice';

// Mock ReactMarkdown component
vi.mock('react-markdown', () => ({
  default: ({ children }) => <div data-testid="markdown">{children}</div>,
}));

// Mock the Task component
vi.mock('./components/task/Task', () => ({
  default: ({ task }) => <div data-testid={`task-${task.id}`}>{task.name}</div>,
}));

// Mock react-modal properly with setAppElement method on the default export
vi.mock('react-modal', () => {
  // Create a mock component function
  const MockModal = ({ children, isOpen, contentLabel }) => (
    isOpen ? <div data-testid="modal" aria-label={contentLabel}>{children}</div> : null
  );
  
  // Add setAppElement as a method on the function
  MockModal.setAppElement = vi.fn();
  
  return {
    __esModule: true,
    default: MockModal
  };
});

// Mock react-toastify
vi.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container"></div>,
}));

describe('SingleProject', () => {
  const mockUser = { id: 1, username: 'testuser', token: 'fake-token' };
  const mockProject = { 
    id: 1, 
    name: 'Test Project', 
    description: '# Project Description', 
    priority: 3 
  };
  const mockTasks = {
    list: [
      { id: 1, name: 'Task 1', done: false, project_id: 1 },
      { id: 2, name: 'Task 2', done: true, project_id: 1 },
    ],
    loading: false,
    error: null
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the project details correctly', () => {
    renderWithProviders(<SingleProject />, {
      preloadedState: {
        user: mockUser,
        selectedProject: mockProject,
        tasks: mockTasks
      }
    });
    
    // Check that project name and priority are rendered
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Priority:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Check that the markdown component received the description
    const markdown = screen.getByTestId('markdown');
    expect(markdown).toHaveTextContent('# Project Description');
    
    // Check that tasks are rendered
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('dispatches fetchTasks on mount', () => {
    renderWithProviders(<SingleProject />, {
      preloadedState: {
        user: mockUser,
        selectedProject: mockProject,
        tasks: mockTasks
      }
    });
    
    // Verify that fetchTasks was called with the correct arguments
    expect(fetchTasks).toHaveBeenCalledWith({ 
      user: mockUser, 
      project: mockProject 
    });
  });

  it('goes back when the back button is clicked', () => {
    renderWithProviders(<SingleProject />, {
      preloadedState: {
        user: mockUser,
        selectedProject: mockProject,
        tasks: mockTasks
      }
    });
    
    // Click the back button
    const backButton = screen.getByText('Go back');
    fireEvent.click(backButton);
    
    // Verify that resetSelectedProject was called
    expect(resetSelectedProject).toHaveBeenCalled();
  });

  it('opens the modal when the New task button is clicked', () => {
    renderWithProviders(<SingleProject />, {
      preloadedState: {
        user: mockUser,
        selectedProject: mockProject,
        tasks: mockTasks
      }
    });
    
    // Click the New task button
    const newTaskButton = screen.getByText('New task');
    fireEvent.click(newTaskButton);
    
    // Check that the modal is opened
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('New task name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter the task name')).toBeInTheDocument();
  });

  it('creates a new task when the Create button is clicked', () => {
    renderWithProviders(<SingleProject />, {
      preloadedState: {
        user: mockUser,
        selectedProject: mockProject,
        tasks: mockTasks
      }
    });
    
    // Open the modal
    const newTaskButton = screen.getByText('New task');
    fireEvent.click(newTaskButton);
    
    // Enter task name
    const taskNameInput = screen.getByPlaceholderText('Enter the task name');
    fireEvent.change(taskNameInput, { target: { value: 'New Task' } });
    
    // Click Create button
    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);
    
    // Verify that addTask was called with the correct arguments
    expect(addTask).toHaveBeenCalledWith({ 
      user: mockUser, 
      task: { 
        name: 'New Task', 
        projectId: mockProject.id 
      } 
    });
  });
});


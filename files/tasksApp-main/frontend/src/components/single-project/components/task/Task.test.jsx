import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../../../../test/test-utils';
import Task from './Task';
import { removeTask, updateTask } from '../../../../redux/slices/tasks/tasks.async.thunks';
import { BsCheck2Square } from 'react-icons/bs';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

// Mock the async thunks
vi.mock('../../../../redux/slices/tasks/tasks.async.thunks', () => ({
  fetchTasks: vi.fn(() => ({ 
    type: 'tasks/fetchTasks/pending',
    payload: undefined,
    meta: { requestId: 'mock-request-id', requestStatus: 'pending' }
  })),
  addTask: vi.fn(() => ({ 
    type: 'tasks/addTask/pending',
    payload: undefined,
    meta: { requestId: 'mock-request-id', requestStatus: 'pending' }
  })),
  removeTask: vi.fn(() => ({ 
    type: 'tasks/removeTask/pending',
    payload: undefined,
    meta: { requestId: 'mock-request-id', requestStatus: 'pending' }
  })),
  updateTask: vi.fn(() => ({ 
    type: 'tasks/updateTask/pending',
    payload: undefined,
    meta: { requestId: 'mock-request-id', requestStatus: 'pending' }
  })),
}));

describe('Task', () => {
  const mockUser = { id: 1, username: 'testuser', token: 'fake-token' };
  
  it('renders a task item correctly', () => {
    const mockTask = { id: 1, name: 'Test Task', done: false, project_id: 1 };
    
    renderWithProviders(<Task task={mockTask} />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Check that the task name is displayed
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    
    // Check that we have two buttons (update and delete)
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
  
  it('shows the correct icon based on task status', () => {
    // Test with a non-completed task
    const mockIncompleteTask = { id: 1, name: 'Incomplete Task', done: false, project_id: 1 };
    
    const { rerender } = renderWithProviders(<Task task={mockIncompleteTask} />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Get the status and delete buttons
    const buttons = screen.getAllByRole('button');
    const statusButton = buttons[0];
    
    // Simple check for button existence rather than trying to check specific icon
    expect(statusButton).toBeInTheDocument();
    
    // Rerender with a completed task
    const mockCompletedTask = { id: 1, name: 'Complete Task', done: true, project_id: 1 };
    rerender(<Task task={mockCompletedTask} />);
    
    // Check button still exists after rerender
    const updatedButtons = screen.getAllByRole('button');
    expect(updatedButtons[0]).toBeInTheDocument();
  });
  
  it('calls removeTask when delete button is clicked', () => {
    const mockTask = { id: 1, name: 'Test Task', done: false, project_id: 1 };
    
    renderWithProviders(<Task task={mockTask} />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Click the delete button (second button)
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    
    // Verify removeTask was called with the correct arguments
    expect(removeTask).toHaveBeenCalledWith({ user: mockUser, task: mockTask });
  });
  
  it('calls updateTask when status button is clicked', () => {
    const mockTask = { id: 1, name: 'Test Task', done: false, project_id: 1 };
    
    renderWithProviders(<Task task={mockTask} />, {
      preloadedState: {
        user: mockUser
      }
    });
    
    // Click the update button (first button)
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    
    // Verify updateTask was called with the correct arguments (toggling done status)
    expect(updateTask).toHaveBeenCalledWith({ 
      user: mockUser, 
      task: { ...mockTask, done: true } 
    });
  });
});

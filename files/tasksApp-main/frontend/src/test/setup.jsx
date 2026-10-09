// Setup file for vitest
import React from "react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock react-router-dom to fix the MemoryRouter issue
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({}),
    useLocation: () => ({ pathname: "/" }),
    // Create a simple Router Context for Link components
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    createRoutesFromChildren: vi.fn(),
    generatePath: vi.fn(),
    matchRoutes: vi.fn(),
    mockNavigate,
  };
});

// Export mockNavigate to be accessible in tests
window.mockNavigate = mockNavigate;

// Add global mocks for Redux thunks that are causing issues
vi.mock('../redux/slices/projects/projects.async.thunks', () => ({
  fetchProjects: vi.fn().mockImplementation(() => ({ type: 'projects/fetchProjects/pending' })),
  addProject: vi.fn().mockImplementation(() => ({ type: 'projects/addProject/pending' })),
  updateProject: vi.fn().mockImplementation(() => ({ type: 'projects/updateProject/pending' })),
  removeProject: vi.fn().mockImplementation(() => ({ type: 'projects/removeProject/pending' }))
}));

vi.mock('../redux/slices/tasks/tasks.async.thunks', () => ({
  fetchTasks: vi.fn().mockImplementation(() => ({ type: 'tasks/fetchTasks/pending' })),
  addTask: vi.fn().mockImplementation(() => ({ type: 'tasks/addTask/pending' })),
  removeTask: vi.fn().mockImplementation(() => ({ type: 'tasks/removeTask/pending' })),
  updateTask: vi.fn().mockImplementation(() => ({ type: 'tasks/updateTask/pending' }))
}));

vi.mock('../redux/slices/user/user.slice', () => {
  const resetUser = vi.fn().mockImplementation(() => ({ type: 'user/resetUser' }));
  const setUser = vi.fn().mockImplementation((payload) => ({ type: 'user/setUser', payload }));
  
  // Ensure there's a default export
  const mockUserReducer = vi.fn().mockImplementation((state = {}, action) => state);
  
  return {
    resetUser,
    setUser,
    default: mockUserReducer
  };
});

vi.mock('../redux/slices/selected-project/selectedProject.slice', () => {
  const resetSelectedProject = vi.fn().mockImplementation(() => ({ type: 'selectedProject/resetSelectedProject' }));
  const setSelectedProject = vi.fn().mockImplementation((payload) => ({ type: 'selectedProject/setSelectedProject', payload }));
  
  // Ensure there's a default export
  const mockSelectedProjectReducer = vi.fn().mockImplementation((state = {}, action) => state);
  
  return {
    resetSelectedProject,
    setSelectedProject,
    default: mockSelectedProjectReducer
  };
});

// Add mocks for projects and tasks reducers
vi.mock('../redux/slices/projects/projects.slice', () => {
  const mockProjectsReducer = vi.fn().mockImplementation((state = { projects: [] }, action) => state);
  
  return {
    default: mockProjectsReducer
  };
});

vi.mock('../redux/slices/tasks/tasks.slice', () => {
  const mockTasksReducer = vi.fn().mockImplementation((state = { tasks: [] }, action) => state);
  
  return {
    default: mockTasksReducer
  };
});

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    dismiss: vi.fn(),
    POSITION: {
      TOP_LEFT: "top-left",
      TOP_RIGHT: "top-right",
      TOP_CENTER: "top-center",
      BOTTOM_LEFT: "bottom-left",
      BOTTOM_RIGHT: "bottom-right",
      BOTTOM_CENTER: "bottom-center",
    },
  },
  ToastContainer: vi.fn(() => null),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Reset all mocks after each test
afterEach(() => {
  vi.resetAllMocks();
});

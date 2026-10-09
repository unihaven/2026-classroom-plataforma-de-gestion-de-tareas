// Mock API Services

// Mock response data
export const mockUser = {
  id: "test-user-id",
  name: "Test User",
  email: "test@example.com",
  token: "test-token",
};

export const mockProjects = [
  {
    id: "project-1",
    name: "Project 1",
    description: "Test Description 1",
    priority: 5,
    userId: "test-user-id",
  },
  {
    id: "project-2",
    name: "Project 2",
    description: "Test Description 2",
    priority: 10,
    userId: "test-user-id",
  },
];

export const mockTasks = [
  {
    id: "task-1",
    name: "Task 1",
    done: false,
    projectId: "project-1",
  },
  {
    id: "task-2",
    name: "Task 2",
    done: true,
    projectId: "project-1",
  },
];

// Mock API functions
export const mockUserApi = {
  logIn: vi.fn().mockImplementation(() => Promise.resolve({ user: mockUser })),
  register: vi
    .fn()
    .mockImplementation(() => Promise.resolve({ user: mockUser })),
};

export const mockProjectApi = {
  fetchProjects: vi
    .fn()
    .mockImplementation(() => Promise.resolve({ projects: mockProjects })),
  fetchProject: vi
    .fn()
    .mockImplementation(() => Promise.resolve(mockProjects[0])),
  createProject: vi.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Project created successfully",
      project: mockProjects[0],
    }),
  ),
  updateProject: vi.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Project updated successfully",
      project: mockProjects[0],
    }),
  ),
  deleteProject: vi.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Project deleted successfully",
    }),
  ),
};

export const mockTaskApi = {
  getTasks: vi
    .fn()
    .mockImplementation(() => Promise.resolve({ tasks: mockTasks })),
  createTask: vi.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Task created successfully",
      task: mockTasks[0],
    }),
  ),
  modifyTask: vi.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Task updated successfully",
      task: { ...mockTasks[0], done: true },
    }),
  ),
  deleteTask: vi.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Task deleted successfully",
    }),
  ),
};

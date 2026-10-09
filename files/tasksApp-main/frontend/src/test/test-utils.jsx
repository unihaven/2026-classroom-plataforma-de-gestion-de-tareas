import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
// Use the mocked reducers
import userReducer from '../redux/slices/user/user.slice';
import projectsReducer from '../redux/slices/projects/projects.slice';
import selectedProjectReducer from '../redux/slices/selected-project/selectedProject.slice';
import tasksReducer from '../redux/slices/tasks/tasks.slice';
import { RouterProvider } from './mock-router-context.jsx';

// Create a custom render function that includes Redux and Router
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Use an inline mock store to avoid the dependency on the actual slices
    store = configureStore({
      reducer: {
        user: (state = {}) => state,
        projects: (state = { projects: [] }) => state,
        selectedProject: (state = {}) => state,
        tasks: (state = { tasks: [] }) => state,
      },
      middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: false,
          thunk: true, // Explicitly enable thunk middleware
        }),
      preloadedState,
    }),
    route = '/',
    ...renderOptions
  } = {}
) {  // Create a wrapper with just Redux Provider
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <RouterProvider initialEntries={[route]}>
          {children}
        </RouterProvider>
      </Provider>
    );
  }

  // Return an object with the rendered UI and utilities
  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// For components that need to be rendered with specific route
export function renderWithRoute(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        user: userReducer,
        projects: projectsReducer,
        selectedProject: selectedProjectReducer,
        tasks: tasksReducer,
      },
      middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: false,
          thunk: true, // Explicitly enable thunk middleware
        }),
      preloadedState,
    }),
    route = '/',
    path = '/',
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';

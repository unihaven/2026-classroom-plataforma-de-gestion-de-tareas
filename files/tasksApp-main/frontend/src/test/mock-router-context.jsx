// This file provides mock router context for testing components with Link
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Wraps a component with MemoryRouter to provide router context
 * This is needed for components that use Link, NavLink, etc.
 */
export function RouterProvider({ children, initialEntries = ['/'] }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  );
}

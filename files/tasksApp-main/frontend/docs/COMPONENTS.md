# Component Documentation

This document provides detailed information about the main components of the Tasks App frontend.

## Layout Components

### Home

**File:** `src/pages/home/Home.jsx`

The main layout wrapper for authenticated pages. Includes the header and uses React Router's Outlet to render child routes.

### Header

**File:** `src/components/header/Header.jsx`

Displays the application header with app name and logout button. Handles the logout process by clearing localStorage and Redux state.

### ProtectedRoute

**File:** `src/components/ProtectedRoute.jsx`

A higher-order component that protects routes requiring authentication. Checks if the user is authenticated, attempts to restore user from localStorage, or redirects to login.

## Authentication Components

### Login

**File:** `src/pages/login/Login.jsx`

Provides a form for user login with email and password fields. Includes form validation and redirects to projects list upon successful authentication.

### Register

**File:** `src/pages/register/Register.jsx`

Registration form for new users with username, email, and password fields. Includes validation and redirects to login after successful registration.

## Project Management Components

### ProjectsList

**File:** `src/components/projects-list/ProjectsList.jsx`

Displays a grid of project cards with an option to add new projects. Fetches projects from the API on component mount.

### ProjectCard

**File:** `src/components/projects-list/components/project-card/ProjectCard.jsx`

Individual project card displaying project name and priority with options to view, edit, or delete. Handles navigation to project details or edit page.

### AddProject

**File:** `src/components/add-project/AddProject.jsx`

Form for creating a new project with fields for name, priority, and markdown description. Uses React Hook Form for validation.

### EditProject

**File:** `src/components/edit-project/EditProject.jsx`

Similar to AddProject but populated with existing project data for updating. Includes validation and back navigation.

### SingleProject

**File:** `src/components/single-project/SingleProject.jsx`

Detailed view of a project showing its description (with markdown rendering) and tasks. Includes functionality to add new tasks.

## Task Management Components

### Task

**File:** `src/components/single-project/components/task/Task.jsx`

Individual task item with options to mark as complete/incomplete or delete. Shows different icons based on task completion status.

## Utility Components

### DotsLoader

**File:** `src/components/dots-loader/DotsLoader.jsx`

Loading indicator component used during async operations like API requests.

### ErrorPage

**File:** `src/components/error-page/ErrorPage.jsx`

Error page displayed when routes don't match or errors occur.

## Component Patterns

The application follows these patterns:

1. **Container/Presentation Pattern**: Most components access Redux state and dispatch actions directly
2. **Composition**: Complex components are composed of smaller, reusable components
3. **Hooks**: Uses React hooks for state management and side effects
4. **Form Management**: Uses React Hook Form with Joi for validation
5. **Async Actions**: Uses Redux Toolkit thunks for API communication

## State Management

Components interact with Redux state through:

1. **useSelector**: To access state
2. **useDispatch**: To dispatch actions
3. **Redux Thunks**: For asynchronous operations

## Testing Approach

Components are tested using Vitest and React Testing Library with these patterns:

1. **Render Tests**: Verify components render correctly with different props/state
2. **Interaction Tests**: Verify components respond correctly to user interactions
3. **Redux Integration**: Tests use a custom renderWithProviders function to include Redux state
4. **Navigation**: Tests verify correct navigation behavior
5. **Form Validation**: Tests verify form validation and submission

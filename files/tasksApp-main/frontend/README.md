# Tasks App Frontend

A React-based frontend application for managing projects and tasks. This application allows users to create, view, edit, and delete projects, as well as create, complete, and delete tasks for each project.

## Features

- **User Authentication**: Register, login, and logout functionality
- **Project Management**: Create, view, edit, and delete projects
- **Task Management**: Create, mark as complete/incomplete, and delete tasks
- **Markdown Support**: Project descriptions support markdown formatting
- **Priority System**: Assign priority levels to projects

## Tech Stack

- **Framework**: React.js with Vite
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form with Joi validation
- **Styling**: CSS with PostCSS
- **HTTP Client**: Axios
- **Testing**: Vitest with React Testing Library
- **Markdown**: React Markdown with Remark GFM
- **UI Components**: React Icons, React Modal, React Tooltip, React Toastify

## Project Structure

```
src/
├── api/                 # API endpoints and configuration
├── components/          # React components
├── helpers/             # Helper functions and utilities
├── pages/               # Page components
├── redux/               # Redux store, slices, and thunks
├── styles/              # Global CSS styles
├── test/                # Test configuration and utilities
└── main.jsx            # Application entry point
```

## Components

The app uses a component-based architecture with the following main components:

- **ProtectedRoute**: Handles authentication protection for routes
- **Header**: App header with navigation and logout button
- **ProjectsList**: Displays list of projects with add functionality
- **ProjectCard**: Individual project card with edit/delete actions
- **SingleProject**: Detailed view of a project with its tasks
- **Task**: Individual task item with toggle/delete actions
- **AddProject/EditProject**: Forms for creating and editing projects

## State Management

The application uses Redux with Redux Toolkit for state management:

- **User Slice**: Authentication state and user information
- **Projects Slice**: List of projects and related operations
- **Selected Project Slice**: Currently selected project
- **Tasks Slice**: Tasks for the selected project

## Testing

The application has comprehensive test coverage using Vitest and React Testing Library:

- **Component Tests**: Tests for rendering and interactions
- **Redux Tests**: Tests for reducers, actions, and thunks
- **Utilities**: Custom render functions that include Redux and Router

To run tests:

```bash
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:ui    # Run tests with UI
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=your_api_url
```

## API Integration

The application communicates with a backend API for persistence. API endpoints are organized in:

- `api/user.routes.js`: Authentication endpoints
- `api/project.routes.js`: Project management endpoints
- `api/task.routes.js`: Task management endpoints

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests for your changes
4. Ensure all tests pass
5. Submit a pull request

# Tasks App

A full-stack project and task management application built with React, Express, and PostgreSQL.

[![tasks](https://res.cloudinary.com/dojhj2erh/image/upload/v1692239507/portfolio/largeTasks_uk6mjs.png "tasks")](https://res.cloudinary.com/dojhj2erh/image/upload/v1692239507/portfolio/largeTasks_uk6mjs.png "tasks")

## Overview

Tasks App is an intuitive application tailored for project and task management. Users can create projects, assign tasks to them, and modify project details as needed. The application features a modern, responsive frontend built with React and Redux Toolkit, while the backend uses Express and PostgreSQL for robust data management and API services.

## Table of Contents

- [Tasks App](#tasks-app)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Project Structure](#project-structure)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Projects](#projects)
    - [Tasks](#tasks)
  - [Testing](#testing)
    - [Backend Testing](#backend-testing)
    - [Frontend Testing](#frontend-testing)
  - [Security](#security)
  - [Contributing](#contributing)
  - [Using the Application](#using-the-application)

## Features

- **User Authentication**: Secure registration, login, and logout functionality
- **Project Management**: Create, view, edit, and delete projects
- **Task Management**: Add tasks to projects, mark as complete/incomplete, and delete tasks
- **Rich Text Support**: Project descriptions support markdown formatting
- **Priority System**: Assign priority levels to projects for better organization
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form with Joi validation
- **Styling**: CSS with PostCSS
- **HTTP Client**: Axios
- **Markdown**: React Markdown with Remark GFM
- **UI Components**: React Icons, React Modal, React Tooltip, React Toastify

### Backend
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: helmet, express-rate-limit, bcrypt
- **Testing**: Jest, Supertest
- **Performance Testing**: k6

## Project Structure

The project is organized into two main directories:

### Frontend
```
frontend/
├── src/
│   ├── api/                 # API endpoints and configuration
│   ├── components/          # React components
│   ├── helpers/             # Helper functions and utilities
│   ├── pages/               # Page components
│   ├── redux/               # Redux store, slices, and thunks
│   ├── styles/              # Global CSS styles
│   └── test/                # Test configuration and utilities
└── public/                  # Static assets
```

### Backend
```
backend/
├── controllers/             # Route controllers
├── database/                # Database connection and config
├── helpers/                 # Helper utilities
├── middlewares/             # Express middlewares
├── models/                  # Sequelize models
├── routes/                  # API routes
├── tests/                   # Test files
└── utils/                   # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL
- npm or pnpm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DATABASE_URL=postgres://username:password@localhost:5432/tasks_app
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## API Documentation

The backend API provides the following endpoints:

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user
- `GET /api/users/me` - Get current user information

### Projects
- `GET /api/projects` - Get all projects for current user
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `GET /api/projects/:projectId/tasks` - Get all tasks for a project
- `POST /api/projects/:projectId/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing

### Backend Testing
The backend has comprehensive test coverage:

```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:controllers # Run controller tests only
npm run test:models      # Run model tests only
npm run test:integration # Run integration tests only
npm run test:load        # Run load tests with k6
```

### Frontend Testing
```bash
cd frontend
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Security

The application implements several security features:

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **Helmet**: Set of middleware functions for securing HTTP headers
- **Input Validation**: Thorough validation of all input data
- **CORS Protection**: Configured Cross-Origin Resource Sharing

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests for your changes
4. Ensure all tests pass
5. Submit a pull request

## Using the Application

1. **Account Creation**: Click 'Sign Up' to create an account with an email, password, and username
2. **Project Management**: Add projects via the '+' icon, edit or delete them as needed
3. **Task Management**: Click on a project name to view its details and manage tasks
4. **Markdown Support**: Use markdown syntax in project descriptions for rich formatting

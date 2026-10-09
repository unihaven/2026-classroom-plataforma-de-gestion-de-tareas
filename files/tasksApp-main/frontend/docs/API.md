# API Documentation

This document describes the API endpoints used by the Tasks App frontend to communicate with the backend server.

## Base Configuration

The API client is configured in `request.conf.js` with the following features:

- Base URL configuration from environment variables
- Automatic JWT token inclusion in request headers
- Global error handling
- Response data transformation

## Authentication Endpoints

Located in `user.routes.js`

### Register User

**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "token": "string"
}
```

### Login User

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "token": "string"
}
```

## Project Endpoints

Located in `project.routes.js`

### Get All Projects

**Endpoint:** `GET /projects`

**Headers:**
- Authorization: Bearer token

**Response:**
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "priority": "number",
    "user_id": "number"
  }
]
```

### Get Project by ID

**Endpoint:** `GET /projects/:id`

**Headers:**
- Authorization: Bearer token

**Response:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "priority": "number",
  "user_id": "number"
}
```

### Create Project

**Endpoint:** `POST /projects`

**Headers:**
- Authorization: Bearer token

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "priority": "number"
}
```

**Response:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "priority": "number",
  "user_id": "number"
}
```

### Update Project

**Endpoint:** `PUT /projects/:id`

**Headers:**
- Authorization: Bearer token

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "priority": "number"
}
```

**Response:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "priority": "number",
  "user_id": "number"
}
```

### Delete Project

**Endpoint:** `DELETE /projects/:id`

**Headers:**
- Authorization: Bearer token

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

## Task Endpoints

Located in `task.routes.js`

### Get Tasks for Project

**Endpoint:** `GET /projects/:projectId/tasks`

**Headers:**
- Authorization: Bearer token

**Response:**
```json
[
  {
    "id": "number",
    "name": "string",
    "done": "boolean",
    "project_id": "number"
  }
]
```

### Create Task

**Endpoint:** `POST /projects/:projectId/tasks`

**Headers:**
- Authorization: Bearer token

**Request Body:**
```json
{
  "name": "string"
}
```

**Response:**
```json
{
  "id": "number",
  "name": "string",
  "done": "boolean",
  "project_id": "number"
}
```

### Update Task

**Endpoint:** `PUT /tasks/:id`

**Headers:**
- Authorization: Bearer token

**Request Body:**
```json
{
  "name": "string",
  "done": "boolean"
}
```

**Response:**
```json
{
  "id": "number",
  "name": "string",
  "done": "boolean",
  "project_id": "number"
}
```

### Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Headers:**
- Authorization: Bearer token

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Handling

API responses use standard HTTP status codes:

- 200: Success
- 201: Resource created
- 400: Bad request (validation error)
- 401: Unauthorized
- 403: Forbidden
- 404: Resource not found
- 500: Server error

Error responses follow this format:

```json
{
  "error": "Error message"
}
```

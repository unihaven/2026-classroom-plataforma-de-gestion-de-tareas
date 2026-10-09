import http from "k6/http";
import { sleep, check } from "k6";
import { Rate } from "k6/metrics";

// Define custom metrics
const failRate = new Rate("failed_requests");

// Test configuration
export const options = {
  stages: [
    { duration: "30s", target: 20 }, // Ramp up to 20 users over 30 seconds
    { duration: "1m", target: 20 }, // Stay at 20 users for 1 minute
    { duration: "30s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should complete within 500ms
    failed_requests: ["rate<0.1"], // Less than 10% of requests should fail
  },
};

// Test setup - these values will be different for each test
const API_BASE_URL = "http://localhost:3000/api/v1";
let authToken = "";
let userId = "";
let projectId = "";
let taskId = "";

// Helper to calculate a random element from an array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Initialize function - runs once per VU
export function setup() {
  // Register a test user
  const registerPayload = JSON.stringify({
    name: `User_${Math.floor(Math.random() * 100000)}`,
    email: `user_${Math.floor(Math.random() * 100000)}@example.com`,
    password: "password123",
  });

  const registerHeaders = { "Content-Type": "application/json" };
  const registerRes = http.post(
    `${API_BASE_URL}/user/register`,
    registerPayload,
    { headers: registerHeaders },
  );

  check(registerRes, {
    "user registered successfully": (r) => r.status === 200,
  });

  // Extract token and user ID for tests
  const registerData = JSON.parse(registerRes.body);
  authToken = registerData.user.token;
  userId = registerData.user.id;

  // Create a test project
  const projectPayload = JSON.stringify({
    name: `Project_${Math.floor(Math.random() * 100000)}`,
    description: "Load test project",
  });

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const projectRes = http.post(`${API_BASE_URL}/project`, projectPayload, {
    headers: authHeaders,
  });

  check(projectRes, {
    "project created successfully": (r) => r.status === 200,
  });

  // Extract project ID
  const projectData = JSON.parse(projectRes.body);
  projectId = projectData.project.id;

  // Create a test task
  const taskPayload = JSON.stringify({
    name: `Task_${Math.floor(Math.random() * 100000)}`,
    projectId: projectId,
  });

  const taskRes = http.post(`${API_BASE_URL}/task`, taskPayload, {
    headers: authHeaders,
  });

  check(taskRes, {
    "task created successfully": (r) => r.status === 200,
  });

  // Extract task ID
  const taskData = JSON.parse(taskRes.body);
  taskId = taskData.task.id;

  // Return data for the test
  return {
    authToken,
    userId,
    projectId,
    taskId,
  };
}

// Default function - runs for each VU
export default function (data) {
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.authToken}`,
  };

  // Select a random API operation to perform
  const operations = [
    "getProject",
    "getTask",
    "createTask",
    "updateTask",
    "deleteTask",
    "createProject",
  ];

  const operation = randomElement(operations);
  let response;

  switch (operation) {
    case "getProject":
      response = http.get(`${API_BASE_URL}/project/${data.projectId}`, {
        headers: authHeaders,
      });
      break;

    case "getTask":
      response = http.get(`${API_BASE_URL}/task/${data.taskId}`, {
        headers: authHeaders,
      });
      break;
    case "createTask": {
      const taskPayload = JSON.stringify({
        name: `Task_${Math.floor(Math.random() * 100000)}`,
        projectId: data.projectId,
      });
      response = http.post(`${API_BASE_URL}/task`, taskPayload, {
        headers: authHeaders,
      });
      break;
    }
    case "updateTask": {
      const updatePayload = JSON.stringify({
        done: Math.random() > 0.5, // Randomly set as true or false
      });
      response = http.put(
        `${API_BASE_URL}/task/${data.taskId}`,
        updatePayload,
        { headers: authHeaders },
      );
      break;
    }
    case "deleteTask": {
      // Create a new task to delete
      const newTaskPayload = JSON.stringify({
        name: `Task_to_delete_${Math.floor(Math.random() * 100000)}`,
        projectId: data.projectId,
      });
      const createResponse = http.post(`${API_BASE_URL}/task`, newTaskPayload, {
        headers: authHeaders,
      });
      const taskData = JSON.parse(createResponse.body);

      // Delete the newly created task
      response = http.del(`${API_BASE_URL}/task/${taskData.task.id}`, null, {
        headers: authHeaders,
      });
      break;
    }
    case "createProject": {
      const projectPayload = JSON.stringify({
        name: `Project_${Math.floor(Math.random() * 100000)}`,
        description: "Load test project",
      });
      response = http.post(`${API_BASE_URL}/project`, projectPayload, {
        headers: authHeaders,
      });
      break;
    }
  }

  // Check if the request was successful
  const checkResult = check(response, {
    "status is 200": (r) => r.status === 200,
  });

  // Record failed requests
  failRate.add(!checkResult);

  // Wait between requests
  sleep(Math.random() * 2);
}

// Teardown function - runs once per VU at the end
export function teardown(data) {
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.authToken}`,
  };

  // Clean up by deleting the project (will cascade delete tasks)
  http.del(`${API_BASE_URL}/project/${data.projectId}`, null, {
    headers: authHeaders,
  });
}

/*
To run this load test:
1. Install k6: npm install -g k6
2. Start your API server
3. Run the test: k6 run ./tests/load-test.js

Results will show:
- Request rates
- Response times
- Error rates
- Custom metrics
*/

# Testing ESM Modules in Node.js Backend

This document provides information about testing ES modules (ESM) in our Node.js Express backend application.

## Background

Our application uses ES modules (using `import`/`export` syntax) instead of CommonJS modules (`require`/`module.exports`). This requires specific configuration for testing with Jest.

## Key Configuration Files

### 1. package.json

The `"type": "module"` setting in package.json indicates this is an ES modules project:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  // ...other configuration
}
```

### 2. jest.config.js

Jest configuration is set up to handle ES modules:

```javascript
export default {
  testEnvironment: "node",
  transform: {}, // No transform needed since we use native ESM
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Handle imports without .js extension
  },
  // Other Jest configuration...
  setupFilesAfterEnv: ["./tests/setup.js"],
};
```

### 3. babel.config.js

Babel is configured to handle ES modules:

```javascript
export default {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

### 4. run-jest.js

We use a custom runner script to handle environment variables and run Jest:

```javascript
import { spawnSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Get directory name in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables and run Jest
// ...rest of the file
```

## Handling Common Issues

### 1. "Cannot use import statement outside a module"

If you see this error, it usually indicates a mismatch between the ES modules configuration and how Jest is running. Solutions:

- Ensure `"type": "module"` is in package.json
- Run tests using `npm test` which uses our custom runner
- Check your babel.config.js is properly set up for ES modules

### 2. Path Issues with ES Modules

ES modules require explicit file extensions. If you see "Cannot find module", ensure:

- Import statements include `.js` extensions
- The moduleNameMapper in jest.config.js is properly configured

### 3. Snapshot Testing

Snapshots work with ES modules but might need special handling:

- If snapshots become outdated, delete the __snapshots__ directory and let tests recreate them
- Run `npm test` to regenerate snapshots

## Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test files
npm run test:controllers
npm run test:models
npm run test:integration
```

## Recent Improvements

1. Fixed route configuration tests in app.test.js by targeting specific endpoints
2. Improved response.snapshot.test.js to use expect() rather than actual snapshots
3. Simplified complex tests to focus on core functionality
4. Ensured consistent use of res.json() instead of res.send() for better testing
5. Added more thorough cleanup between tests to prevent test interdependence

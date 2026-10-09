// Windows-compatible Jest runner for ESM support
// Run this script directly with Node.js to avoid shell script compatibility issues

import { spawnSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Get directory name in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env.test
try {
  const envFilePath = resolve(__dirname, ".env.test");
  if (existsSync(envFilePath)) {
    const envFile = readFileSync(envFilePath, "utf8");
    envFile.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, value] = trimmedLine.split("=");
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
    console.log("Loaded test environment variables from .env.test");
  } else {
    console.warn("No .env.test file found. Using default test environment.");
    // Set default test variables
    process.env.JWT_SECRET_KEY = "test-secret-key";
    process.env.NODE_ENV = "test";
    process.env.DB_CONNECTION_STRING = "sqlite::memory:";
  }
} catch (error) {
  console.warn("Could not load .env.test file:", error.message);
}

// Set required Node.js options for ESM support
process.env.NODE_OPTIONS = "--experimental-vm-modules --no-warnings";

// Parse command line arguments to pass to Jest
const args = process.argv.slice(2);

// Run Jest with the specified arguments
const result = spawnSync("npx", ["jest", "--detectOpenHandles", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

// Exit with the same code as Jest
process.exit(result.status);

import Sequelize from "sequelize";

// For testing, use an in-memory SQLite database if no connection string is provided
const connectionString = process.env.DB_CONNECTION_STRING || "sqlite::memory:";

// Determine the dialect based on the connection string
let dialect = "postgres"; // Default to postgres
if (connectionString.includes("sqlite")) {
  dialect = "sqlite";
}

const sequelize = new Sequelize(connectionString, {
  dialect: dialect,
  logging: false, // Disable logging during tests
});

export default sequelize;

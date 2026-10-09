import { getReasonPhrase } from "http-status-codes";

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  // Check for Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    const messages = err.errors.map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  const responseBody = {
    success: false,
    message: err.message || getReasonPhrase(statusCode),
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  // Use json instead of send to ensure consistency in tests
  return res.status(statusCode).json(responseBody);
};

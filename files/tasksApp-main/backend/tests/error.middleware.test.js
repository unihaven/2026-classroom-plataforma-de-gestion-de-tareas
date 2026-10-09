// filepath: c:\Users\iontc\Proyectos\tasks app\backend\tests\error.middleware.test.js
import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { errorHandler } from "../middlewares/errorHandler.js";
import { ApiError } from "../utils/errors.js";

// Mock req, res objects
const mockRequest = () => ({});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Error Handler Middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle ApiError with correct status code", () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    const apiError = new ApiError("Custom error message", 403);

    errorHandler(apiError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalled();
  });

  it("should handle Sequelize validation errors with status 400", () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    const validationError = {
      name: "SequelizeValidationError",
      errors: [
        { message: "Field A is required" },
        { message: "Field B must be a number" },
      ],
    };

    errorHandler(validationError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it("should handle generic errors with status 500", () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    const genericError = new Error("Something went wrong");

    errorHandler(genericError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
});

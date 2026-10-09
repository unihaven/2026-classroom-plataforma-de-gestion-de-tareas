import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(path) {
    super(`The requested path ${path} was not found!`, StatusCodes.NOT_FOUND);
  }
}

export class ValidationError extends Error {
  constructor(errorsArray, statusCode) {
    super();
    this.statusCode = statusCode;
    this.errorArray = errorsArray;
    Error.captureStackTrace(this, this.constructor);
  }
}
